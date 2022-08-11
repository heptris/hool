package com.ssafy.hool.dto.member;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.MemberEmojiDto;
import com.ssafy.hool.dto.response.CursorResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponseDto {

    private Long memberId;
    private String nickName;
    private String memberEmail;
    private int point;
    private String memberProfile;
    // 보유한 이모지 개수
    private int emojiCount;
    // 친구 수
    private int friendCount;

    private CursorResult memberEmojiList;

    public static MemberJoinResponseDto of(Member member) {
        return new MemberJoinResponseDto(member.getMemberEmail());
    }
}
