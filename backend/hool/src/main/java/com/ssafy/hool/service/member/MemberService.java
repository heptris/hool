package com.ssafy.hool.service.member;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.DetailMemberEmojiDto;
import com.ssafy.hool.dto.emoji.EmojiDto;
import com.ssafy.hool.dto.emoji.MemberEmojiDto;
import com.ssafy.hool.dto.member.MemberJoinResponseDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.MemberEmojiRepository;
import com.ssafy.hool.repository.friend.FriendRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final FriendRepository friendRepository;
    private final MemberEmojiRepository memberEmojiRepository;
    private final EmojiRepository emojiRepository;


    // 회원 가입
    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    public Optional<Member> findByMemberEmail(String email) {
        return memberRepository.findByMemberEmail(email);
    }

    public boolean existsByNickName(String nickName) {
        return memberRepository.existsByNickName(nickName);
    }

    public Member findByMemberId(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }


    // 회원 수정
    @Transactional
    public void updateMember(Long memberId, String password, String name, String nickName) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        member.setPassword(passwordEncoder.encode(password));
        member.setName(name);
        member.setNickName(nickName);
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
        List<Long> deleteFriendIds = friendRepository.findByFriendMemberId(memberId);
        friendRepository.deleteAllByIdInBatch(deleteFriendIds);
    }

    public int getFriendCount(Long memberId) {
        return memberRepository.getFriendCount(memberId);
    }

    public int getEmojiCount(Long memberId) {
        return memberRepository.getEmojiCount(memberId);
    }

    public List<MemberEmojiDto> getEmojis(Long memberId) {
        return memberEmojiRepository.getMyEmojis(memberId);
    }

    public List<MemberEmojiDto> getFavoriteEmojis(Long memberId) {
        return memberEmojiRepository.getFavoriteEmojis(memberId);
    }

    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional(readOnly = true)
    public MemberJoinResponseDto getMyInfo() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberJoinResponseDto::of)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    public DetailMemberEmojiDto getDetailEmoji(Long emojiId) {
        Emoji emoji = emojiRepository.findById(emojiId).orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        Member emojiCreator = memberRepository.findById(emoji.getCreatorId()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        DetailMemberEmojiDto detailEmoji = DetailMemberEmojiDto.builder()
                .emojiId(emojiId)
                .name(emoji.getName())
                .description(emoji.getDescription())
                .url(emoji.getUrl())
                .creatorName(emojiCreator.getName())
                .build();
        return detailEmoji;
    }
}
