package com.ssafy.hool.exception.ex;

import lombok.Data;

@Data
public class CustomException extends RuntimeException {

    public CustomException(String message) {
        super(message);
    }
}
