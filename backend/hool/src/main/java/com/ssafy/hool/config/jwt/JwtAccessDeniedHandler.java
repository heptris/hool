package com.ssafy.hool.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hool.dto.response.ResponseDto;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // content -type
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        ResponseDto<String> responseDto = new ResponseDto<>(403, "FORBIDDEN", "권한x");
        String result = objectMapper.writeValueAsString(responseDto);
        response.getWriter().write(result);
    }
}