package com.ssafy.hool.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameBettStatisticsResponseDto {
    // Game
    private int trueRatio;
    private int falseRatio;
    private double trueDividendRate;
    private double falseDividendRate;
    private int truePoint;
    private int falsePoint;
    private int trueUser;
    private int falseUser;
}
