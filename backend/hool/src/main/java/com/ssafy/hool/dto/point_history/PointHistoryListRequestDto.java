package com.ssafy.hool.dto.point_history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryListRequestDto {

    private Long memberId;
}
