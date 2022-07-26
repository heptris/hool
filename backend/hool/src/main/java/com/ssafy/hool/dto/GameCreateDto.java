package com.ssafy.hool.dto;

import com.ssafy.hool.domain.GameStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameCreateDto {
    // Game
    private String gameName;
    private LocalDateTime createdTime;
    private boolean gameResult;

    // Game History -> Dto로 변환?
    private int bettPoint;
    private boolean bettChoice;
    private GameStatus gameStatus;
}
