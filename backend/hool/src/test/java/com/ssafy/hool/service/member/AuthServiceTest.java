package com.ssafy.hool.service.member;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.member.PasswordResetDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private MemberService memberService;

    @Test
    void 비밀번호_초기화() {
        PasswordResetDto passwordResetDto = new PasswordResetDto("aa@naver.com", "5678", "5678");
        authService.passwordReset(passwordResetDto);

        Member member = memberService.findByMemberEmail(passwordResetDto.getEmail()).get();
        assertThat(member.getPassword().equals(passwordEncoder.encode("5678")));
    }

    @Test
    void 비밀번호() {
        System.out.println(passwordEncoder.encode("ssafy1234!"));
    }
}