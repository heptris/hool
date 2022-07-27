package com.ssafy.hool.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberCreateDto {

    private String memberEmail;
    private String password;
    private String name;
    private String nickName;
}
