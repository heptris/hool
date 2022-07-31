package com.ssafy.hool.controller;


import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.dto.member.MemberJoinResponseDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.dto.token.TokenDto;
import com.ssafy.hool.dto.token.TokenRequestDto;
import com.ssafy.hool.exception.ex.CustomValidationException;
import com.ssafy.hool.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseDto<?> signup(@RequestBody @Valid MemberJoinDto memberJoinDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            throw new CustomValidationException("유효성 검사 실패", errorMap);
        } else {
            return new ResponseDto<>(200, "회원가입성공", authService.signup(memberJoinDto));
        }

    }

    @PostMapping("/login")
    public ResponseDto<?> login(@RequestBody MemberLoginDto memberLoginDto) {
        return new ResponseDto<>(200, "로그인성공", authService.login(memberLoginDto));
    }

    @PostMapping("/reissue")
    public ResponseDto<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return new ResponseDto<>(200, "토큰 재발행", authService.reissue(tokenRequestDto));
    }

    /**
     * 로그아웃
     */
    @GetMapping("/logout")
    public ResponseDto logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        authService.logout(accessToken);
        ResponseDto responseDto = new ResponseDto<Object>(200, "로그아웃 완료", null);
        return responseDto;
    }
}