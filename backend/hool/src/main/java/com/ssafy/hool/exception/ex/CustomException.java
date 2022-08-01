package com.ssafy.hool.exception.ex;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class CustomException extends RuntimeException {

    public final ErrorCode errorCode;


}
