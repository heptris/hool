package com.ssafy.hool.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CursorResult<T> {

    private T values;
    private Boolean hasNext;
    private Long cursorId;
}
