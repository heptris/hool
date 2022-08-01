package com.ssafy.hool.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hool.dto.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
//        log.error(authException.getMessage());
//        // content -type
//        response.setContentType("application/json");
//        response.setCharacterEncoding("utf-8");
//
//        ResponseEntity responseEntity = new ResponseEntity<>(new ResponseDto<>(401, "UNAUTHORIZED", "인증X")
//                , HttpStatus.UNAUTHORIZED);
//
//        String result = objectMapper.writeValueAsString(responseEntity);
//        response.getWriter().write(result);
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "UnAuthorized");
    }
}