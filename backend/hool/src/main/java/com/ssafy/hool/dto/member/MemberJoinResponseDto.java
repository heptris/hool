package com.ssafy.hool.dto.member;

import com.ssafy.hool.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberJoinResponseDto {
    private String memberEmail;

    public static MemberJoinResponseDto of(Member member) {
        return new MemberJoinResponseDto(member.getMemberEmail());
    }
}