package com.ssafy.hool.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameHistoryResponseDto {
    private int bettPoint;
    private boolean bettChoice;
    private Long memberId;
}
