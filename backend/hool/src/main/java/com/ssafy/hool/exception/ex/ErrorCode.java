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
    NOT_EQUAL_PASSWORD(400, "비밀번호가 서로 일치하지 않습니다"),
    INVALID_GOOGLE_ID_TOKEN(400, "유효하지 않은 token입니다"),

    FILE_UPLOAD_ERROR(400, "파일 업로드 에러"),

    // 401
    INVALID_REFRESH_TOKEN(401, "유효하지 않은 RefreshToken 입니다."),
    INVALID_ACCESS_TOKEN(401, "유요하지 않은 accessToken 입니다."),
    EXPIRED_ACCESS_TOKEN(401, "만료된 accessToken 입니다."),
    CANNOT_MODIFY_EMOJI(401, "이모지를 수정할 권한이 없습니다."),

    MAIL_CODE_ERROR(401, "메일 인증 실패"),

    OWNER_CREATE_GAME(403, "방장만 게임을 만들 수 있습니다."),
    OWNER_FINISH_GAME(403, "방장만 게임을 종료할 수 있습니다."),

    // 404 NOT FOUND 잘못된 리소스 접근
    MEMBER_NOT_FOUND(404, "존재하지 않은 회원 ID 입니다."),
    MEMBER_EMAIL_NOT_FOUND(404, "존재하지 않은 이메일입니다."),
    MEMBER_NICKNAME_NOT_FOUND(404, "존재하지 않은 닉네임입니다."),

    EMOJI_NOT_FOUND(404, "존재하지 않는 이모지입니다."),
    EMOJI_SHOP_NOT_FOUND(404, "이모지 상점에 존재하지 않는 이모지입니다."),

    CONFERENCE_NOT_FOUND(404, "존재하지 않는 응원방입니다."),
    GAME_NOT_FOUND(404, "존재하지 않는 게임입니다."),

    //409 CONFLICT 중복된 리소스
    ALREADY_SAVED_MEMBER(409, "이미 가입되어 있는 회원입니다."),
    ALREADY_USED_NICKNAME(409, "이미 사용중인 닉네임입니다."),
    ALREADY_SAVED_FRIEND(409, "이미 친구 상태입니다."),
    ALREADY_HAVE_EMOJI(409, "이미 가지고 있는 이모지 입니다."),

    ALREADY_SEND_FRIEND_ADD_MESSAGE(409, "이미 친구 추가 메세지를 보냈습니다"),
    LACK_OF_POINT(409, "보유 포인트가 부족합니다."),

    MAIL_ERROR(421, "메일 오류"),

    //500 INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(500, "서버 에러입니다. 서버 팀에 연락주세요!");

    private final int status;
    private final String message;
}
