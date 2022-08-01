package com.ssafy.hool.dto.game;

import com.ssafy.hool.domain.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameHistoryCreateDto {
    private int bettPoint;
    private boolean bettChoice;
    private GameStatus gameStatus;
    private String memberNickName;
    private Long gameId;
}
