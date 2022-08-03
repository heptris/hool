package com.ssafy.hool.controller.auth;


import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.dto.member.MemberLoginDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.dto.token.TokenRequestDto;
import com.ssafy.hool.exception.ex.CustomValidationException;
import com.ssafy.hool.service.member.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Api(tags = {"회원가입, 로그인, 로그아웃, 토큰 재발행을 제공하는 Controller"})
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @ApiOperation(value = "회원가입", notes = "회원가입 성공 시 이메일을 반환해줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 409, message = "이미 존재하는 이메일"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
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
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "비밀번호 오류"),
            @ApiResponse(code = 404, message = "존재하지 않은 이메일입니다."),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto memberLoginDto) {
        return new ResponseEntity<ResponseDto>(new ResponseDto<>(200, "로그인 성공",
                authService.login(memberLoginDto)), HttpStatus.OK);
    }


    @ApiOperation(value = "토큰 재발행", notes = "accessToken 만료 시 재발행 용도입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "토큰 재발행 성공"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return new ResponseEntity<ResponseDto>(new ResponseDto<>(200, "토큰 재발행",
                authService.reissue(tokenRequestDto)), HttpStatus.OK);
    }

    /**
     * 로그아웃
     */
    @ApiOperation(value = "로그아웃", notes = "로그아웃 시 accessToken과 refreshToken은 더이상 사용할 수 없습니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        authService.logout(accessToken);
        return new ResponseEntity<>(new ResponseDto<Object>(200, "로그아웃 완료", null)
                , HttpStatus.OK);
    }
}