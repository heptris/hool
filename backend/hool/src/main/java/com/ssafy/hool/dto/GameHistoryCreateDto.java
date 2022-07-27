package com.ssafy.hool.dto;

import com.ssafy.hool.domain.GameStatus;
import lombok.Data;

@Data
public class GameHistoryCreateDto {
    private int bettPoint;
    private boolean bettChoice;
    private GameStatus gameStatus;
    private String memberNickName;
    private Long gameId;
}
