package com.ssafy.hool.dto.game;

import com.ssafy.hool.domain.game.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameHistoryCreateDto {
    private int bettPoint;
    private boolean bettChoice;
    private GameStatus gameStatus;
    private Long gameId;
}
