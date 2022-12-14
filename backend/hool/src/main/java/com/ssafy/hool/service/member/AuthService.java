package com.ssafy.hool.service.member;

import com.ssafy.hool.config.jwt.TokenProvider;
import com.ssafy.hool.config.oauth.ClientGoogle;
import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.member.MemberStatus;
import com.ssafy.hool.dto.member.MemberJoinResponseDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.member.PasswordResetDto;
import com.ssafy.hool.dto.token.TokenDto;
import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.dto.token.TokenRequestDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.point.PointHistoryService;
import com.ssafy.hool.service.s3.AwsS3Service;
import com.ssafy.hool.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    private final ClientGoogle clientGoogle;

    private final AwsS3Service awsS3Service;
    private final PointHistoryService pointHistoryService;

    private final EmojiRepository emojiRepository;

    /**
     * 회원가입
     */
    @Transactional
    public MemberJoinResponseDto signup(MemberJoinDto memberJoinDto) {
        if (memberRepository.existsByMemberEmail(memberJoinDto.getMemberEmail())) {
            throw new CustomException(ALREADY_SAVED_MEMBER);
        }

        Member member = memberJoinDto.toMember(passwordEncoder);
        member.setProfileImage(getRandomImage());

        List<Emoji> defaultEmoji = emojiRepository.findByDefaultEmoji();
        for (Emoji emoji : defaultEmoji) {
            Member_emoji memberEmoji = Member_emoji.createDefaultMemberEmoji(member, emoji);
            member.getEmojis().add(memberEmoji);
        }
        Member saveMember = memberRepository.save(member);

        pointHistoryService.signUpPoint(member.getId()); // 회원가입 보너스 +10000 포인트


        return MemberJoinResponseDto.of(saveMember);
    }



    @Transactional
    public TokenDto login(MemberLoginDto memberLoginDto) throws RuntimeException{

        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginDto.toAuthentication();

        Member member = memberRepository.findByMemberEmail(memberLoginDto.getMemberEmail()).orElseThrow(() ->
                new CustomException(MEMBER_EMAIL_NOT_FOUND));

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        member.updateMemberStatus(MemberStatus.ONLINE);
        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new CustomException(INVALID_REFRESH_TOKEN);
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // redis에 있는 refreshToken과 비교
        tokenProvider.checkRefreshToken(authentication.getName(), tokenRequestDto.getRefreshToken());

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);


        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public void logout(String accessToken) {
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        tokenProvider.logout(authentication.getName(), accessToken);
    }

    @Transactional
    public TokenDto googleLogin(String googleToken) {
        Member member = clientGoogle.getMember(googleToken);
        String password = member.getPassword();
        if (!memberRepository.existsByMemberEmail(member.getMemberEmail())) { // 회원 가입
            member.setProfileImage(getRandomImage());
            member.setPassword(passwordEncoder.encode(member.getPassword()));

            List<Emoji> defaultEmoji = emojiRepository.findByDefaultEmoji();
            for (Emoji emoji : defaultEmoji) {
                Member_emoji memberEmoji = Member_emoji.createDefaultMemberEmoji(member, emoji);
                member.getEmojis().add(memberEmoji);
            }

            memberRepository.save(member);

            pointHistoryService.signUpPoint(member.getId()); // 회원가입 보너스 +10000 포인트
        }
        Member savedMember = memberRepository.findByMemberEmail(member.getMemberEmail()).
                orElseThrow(() -> new CustomException(MEMBER_EMAIL_NOT_FOUND));
        // Token 반환
        MemberLoginDto googleLoginDto = new MemberLoginDto(member.getMemberEmail(), password);
        UsernamePasswordAuthenticationToken authenticationToken = googleLoginDto.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        savedMember.updateMemberStatus(MemberStatus.ONLINE);

        return tokenDto;
    }

    @Transactional
    public void passwordReset(PasswordResetDto passwordResetDto) {
        Member member = memberRepository.findByMemberEmail(passwordResetDto.getEmail()).orElseThrow(
                () -> new CustomException(MEMBER_EMAIL_NOT_FOUND));
        member.updatePassword(passwordEncoder.encode(passwordResetDto.getPassword()));

    }

    private String getRandomImage() {
        int random = (int) (Math.random() * 6) + 1;
        String path = "member/default/" + random + ".jpg";
        String thumbnailPath = awsS3Service.getThumbnailPath(path);
        return thumbnailPath;
    }
}