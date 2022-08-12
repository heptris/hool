package com.ssafy.hool.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberUpdateProfileDto {

    private String nickName;
    private String memberProfile;
}
