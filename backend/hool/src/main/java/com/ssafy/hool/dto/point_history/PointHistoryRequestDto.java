package com.ssafy.hool.dto.point_history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryRequestDto {
    private Long memberId;
    private String description;
    private int dealtPoint;
    private Long dealHistoryId;
    private Long gameHistoryId;
}
