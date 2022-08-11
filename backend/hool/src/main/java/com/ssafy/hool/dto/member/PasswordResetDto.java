package com.ssafy.hool.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PasswordResetDto {

    private String email;
    private String password;
    private String passwordConfirm;
}
