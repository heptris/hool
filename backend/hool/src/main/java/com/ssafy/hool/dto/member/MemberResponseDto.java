package com.ssafy.hool.dto.member;

import com.ssafy.hool.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MemberResponseDto {

    private String nickName;
    private String memberEmail;
    private int point;
    // 보유한 이모지 개수
    private int emojiCount;
    // 친구 수
    private int friendCount;

    public static MemberJoinResponseDto of(Member member) {
        return new MemberJoinResponseDto(member.getMemberEmail());
    }
}
