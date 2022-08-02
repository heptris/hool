package com.ssafy.hool.dto.deal_history;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DealHistoryResponseDto {
    private String name;
    private String description;
    private int dealPoint;
}
