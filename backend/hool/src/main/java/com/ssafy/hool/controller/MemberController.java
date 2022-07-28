package com.ssafy.hool.controller;

import com.ssafy.hool.config.jwt.TokenProvider;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.member.*;
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
    private final TokenProvider jwtTokenProvider;



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


    @GetMapping("/api/me")
    public ResponseEntity<MemberJoinResponseDto> getMyMemberInfo() {
        return ResponseEntity.ok(memberService.getMyInfo());
    }


    /**
     * 회원 프로필 조회
     */
    @GetMapping("/api/member/{memberId}")
    public ResponseDto memberProfile(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        int friendCount = memberService.getFriendCount(memberId);
        MemberResponseDto memberProfile = MemberResponseDto.builder()
                .nickName(member.getNickName())
                .memberEmail(member.getMemberEmail())
                .point(member.getPoint())
                .friendCount(friendCount)
                .build();

        return new ResponseDto<MemberResponseDto>(200, "success", memberProfile);
    }

    /**
     * 회원 프로필 수정
     */
    @PutMapping("/api/member/{memberId}")
    public ResponseDto memberUpdate(@PathVariable("memberId")Long memberId, @RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.updateMember(memberId, memberUpdateDto.getPassword(), memberUpdateDto.getName(), memberUpdateDto.getNickName());

        return new ResponseDto(200, "success", "회원 수정 완료");
    }
}
