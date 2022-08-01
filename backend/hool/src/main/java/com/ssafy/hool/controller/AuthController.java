package com.ssafy.hool.controller;


import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.dto.member.MemberJoinResponseDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.dto.token.TokenDto;
import com.ssafy.hool.dto.token.TokenRequestDto;
import com.ssafy.hool.exception.ex.CustomValidationException;
import com.ssafy.hool.service.AuthService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.http.HttpStatus;
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

    @ApiOperation(value = "회원가입", notes = "회원가입 성공 시 이메일을 반환해줍니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberJoinDto memberJoinDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            throw new CustomValidationException("유효성 검사 실패", errorMap);
        } else {
            return new ResponseEntity<ResponseDto>(new ResponseDto(200, "회원가입 성공",
                    authService.signup(memberJoinDto)), HttpStatus.OK);
        }

    }

    @ApiOperation(value = "로그인", notes = "로그인 성공 시 accessToken과 refreshToken을 반환해줍니다.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto memberLoginDto) {
        return new ResponseEntity<ResponseDto>(new ResponseDto<>(200, "로그인 성공",
                authService.login(memberLoginDto)), HttpStatus.OK);
    }

    @ApiOperation(value = "토큰 재발행", notes = "accessToken 만료 시 재발행 용도입니다.")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return new ResponseEntity<ResponseDto>(new ResponseDto<>(200, "토큰 재발행",
                authService.reissue(tokenRequestDto)), HttpStatus.OK);
    }

    /**
     * 로그아웃
     */
    @ApiOperation(value = "로그아웃", notes = "로그아웃 시 accessToken과 refreshToken은 더이상 사용할 수 없습니다.")
    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        authService.logout(accessToken);
        return new ResponseEntity<>(new ResponseDto<Object>(200, "로그아웃 완료", null)
                , HttpStatus.OK);
    }
}