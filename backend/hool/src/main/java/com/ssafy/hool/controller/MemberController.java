package com.ssafy.hool.controller;

import com.ssafy.hool.config.jwt.JwtTokenProvider;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.member.MemberCreateDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.member.MemberResponseDto;
import com.ssafy.hool.dto.member.MemberUpdateDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/join")
    public ResponseEntity<Long> join(@RequestBody MemberCreateDto memberCreateDto) {
        Member member = Member.createMember(memberCreateDto);
        member.setPassword(passwordEncoder.encode(memberCreateDto.getPassword()));
        member.setRoles(Collections.singletonList("ROLE_USER"));
        Long memberId = memberService.join(member);
        return new ResponseEntity<Long>(memberId, HttpStatus.OK);
    }

    /**
     * 닉네임 중복 체크
     */
    @GetMapping("/nickname/check")
    public ResponseDto checkNickNameDuplication(@RequestParam("nickName") String nickName) {
        if (memberService.existsByNickName(nickName) == true) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        } else {
            return new ResponseDto<String>(200, "success", "사용가능한 닉네임입니다.");
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody MemberLoginDto memberLoginDto) {
        String memberEmail = memberLoginDto.getMemberEmail();
        Member member = memberService.findByMemberEmail(memberEmail).orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디입니다."));
        if (passwordEncoder.matches(memberLoginDto.getPassword(), member.getPassword())) {
            return jwtTokenProvider.createToken(memberEmail);
        }
        return "비밀번호 오류";
    }

    /**
     * 회원 프로필 조회
     */
    @GetMapping("/api/member/{memberId}")
    public ResponseDto memberProfile(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        MemberResponseDto memberProfile = MemberResponseDto.builder()
                .nickName(member.getNickName())
                .memberEmail(member.getMemberEmail())
                .point(member.getPoint())
                .build();

        return new ResponseDto<MemberResponseDto>(200, "success", memberProfile);
    }

    @PutMapping("/api/member/{memberId}")
    public ResponseDto memberUpdate(@PathVariable("memberId")Long memberId, @RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.updateMember(memberId, memberUpdateDto.getPassword(), memberUpdateDto.getName(), memberUpdateDto.getNickName());

        return new ResponseDto(200, "success", "회원 수정 완료");
    }
}
