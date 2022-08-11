package com.ssafy.hool.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CursorFriendListResult<T> {

    private T values;
    private Boolean hasNext;
    private LocalDateTime last;
}
