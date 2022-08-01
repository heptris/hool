package com.ssafy.hool.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GameResponseDto {
    // Game
    private Long gameId;
    private Long conferenceId;
    private LocalDateTime createdTime;
    private boolean gameResult;
}
