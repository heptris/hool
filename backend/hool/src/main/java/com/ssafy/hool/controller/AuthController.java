package com.ssafy.hool.controller;


import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.dto.member.MemberJoinResponseDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.token.TokenDto;
import com.ssafy.hool.dto.token.TokenRequestDto;
import com.ssafy.hool.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberJoinResponseDto> signup(@RequestBody MemberJoinDto memberJoinDto) {
        return ResponseEntity.ok(authService.signup(memberJoinDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberLoginDto memberLoginDto) {
        return ResponseEntity.ok(authService.login(memberLoginDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}