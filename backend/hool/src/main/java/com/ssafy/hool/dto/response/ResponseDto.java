package com.ssafy.hool.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDto<T> {
    private Integer statusCode;
    private String message;
    private T data;
}
