package com.ssafy.hool.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GameSaveResultDto {
    // Game
    private Long gameId;
    private boolean result;
}
