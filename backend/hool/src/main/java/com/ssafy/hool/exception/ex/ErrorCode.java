package com.ssafy.hool.exception.ex;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    // 400 BAD_REQUEST 잘못된 요청
    INVALID_PASSWORD(400, "비밀번호 값이 틀립니다"),
    INVALID_PARAMETER(400, "파라미터 값을 확인해 주세요"),

    // 401
    INVALID_REFRESH_TOKEN(401, "유효하지 않은 RefreshToken 입니다."),
    INVALID_ACCESS_TOKEN(401, "유요하지 않은 accessToken 입니다."),
    EXPIRED_ACCESS_TOKEN(401, "만료된 accessToken 입니다."),
    CANNOT_MODIFY_EMOJI(401, "이모지를 수정할 권한이 없습니다."),

    // 404 NOT FOUND 잘못된 리소스 접근
    MEMBER_NOT_FOUND(404, "존재하지 않은 회원 ID 입니다."),
    MEMBER_EMAIL_NOT_FOUND(404, "존재하지 않은 이메일입니다."),
    MEMBER_NICKNAME_NOT_FOUND(404, "존재하지 않은 닉네임입니다."),

    EMOJI_NOT_FOUND(404, "존재하지 않는 이모지입니다."),
    EMOJISHOP_NOT_FOUND(404, "이모지 상점에 존재하지 않는 이모지입니다."),

    //409 CONFLICT 중복된 리소스
    ALREADY_SAVED_MEMBER(409, "이미 가입되어 있는 회원입니다."),
    ALREADY_SAVED_FRIEND(409, "이미 친구 상태입니다.");


    private final int status;
    private final String message;
}
