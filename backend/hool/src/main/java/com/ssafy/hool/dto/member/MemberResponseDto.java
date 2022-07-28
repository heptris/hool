package com.ssafy.hool.dto.member;

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
    private int emojiCount;
    private int friendCount;
}
