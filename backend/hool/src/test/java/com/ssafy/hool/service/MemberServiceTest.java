package com.ssafy.hool.service;

import com.ssafy.hool.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 중복_닉네임_체크() {
        boolean check = memberRepository.existsByNickName("messi");
        Assertions.assertThat(check).isEqualTo(true);
    }

}