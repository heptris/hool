package com.ssafy.hool.controller;

import com.ssafy.hool.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberControllerTest {

    @Autowired
    private MemberService memberService;

    @Test
    void 회원_프로필_조회() {

    }
}