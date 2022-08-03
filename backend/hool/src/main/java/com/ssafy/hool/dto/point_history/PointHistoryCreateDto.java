package com.ssafy.hool.dto.point_history;

import com.ssafy.hool.domain.point.PointType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryCreateDto {
    private String description;
    private int dealtPoint;
    private int currentPoint;
    private PointType pointType;
}
