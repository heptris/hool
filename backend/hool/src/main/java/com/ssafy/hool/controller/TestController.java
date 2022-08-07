package com.ssafy.hool.controller;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.member.MemberService;
import com.ssafy.hool.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<?> GetTest() {
        return new ResponseEntity<>(new ResponseDto(200, "deploy test", null), HttpStatus.OK);
    }

    @PostMapping("/test")
    public ResponseEntity<?> PostTest() {
        return new ResponseEntity<>(new ResponseDto(200, "post test", null), HttpStatus.OK);
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
