package com.ssafy.hool.exception;

import com.ssafy.hool.exception.ex.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public String badRequest(BadRequestException e) {
        log.info("bad = {}", e.getMessage());
        return e.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String errorTest(IllegalArgumentException e) {
      log.error("exxor = {}", e.getMessage());
        return e.getMessage();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String passwordError(BadCredentialsException e) {
        log.error("password = {}", e.getMessage());
        return "비밀번호 오류";
    }

    @ExceptionHandler(RuntimeException.class)
    public String test(RuntimeException e) {
        log.error(e.getMessage());
        return e.getMessage();
    }
}
