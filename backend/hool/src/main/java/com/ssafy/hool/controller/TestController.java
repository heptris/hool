package com.ssafy.hool.controller;

import com.ssafy.hool.domain.Member;
import com.ssafy.hool.service.MemberService;
import com.ssafy.hool.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/")
    public String test() {
        return "ok";
    }

    @GetMapping("/api")
    public String testapi() {
        return "api";
    }

    @GetMapping("/api/member")
    public String member() {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member member = memberService.findByMemberId(currentMemberId);
        System.out.println(member.getNickName());
        return "member";
    }

    @GetMapping("/api/admin")
    public String admin() {
        return "admin";
    }
}
