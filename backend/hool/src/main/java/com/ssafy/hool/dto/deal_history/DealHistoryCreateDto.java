package com.ssafy.hool.dto.deal_history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DealHistoryCreateDto {
    private int dealPoint;
    private Long buyerMemberId;
    private Long sellerMemberId;
    private Long emojiShopId;
}
