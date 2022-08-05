package com.ssafy.hool.dto.deal_history;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DealHistoryCreateDto {
    private int dealPoint;
    private Long sellerMemberId;
}
