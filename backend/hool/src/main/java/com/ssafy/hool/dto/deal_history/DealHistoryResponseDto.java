package com.ssafy.hool.dto.deal_history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DealHistoryResponseDto {
    private String name;
    private String description;
    private int dealPoint;
}
