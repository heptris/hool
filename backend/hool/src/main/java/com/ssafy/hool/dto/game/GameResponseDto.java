package com.ssafy.hool.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GameResponseDto {
    // Game
    private String gameName;
    private LocalDateTime createdTime;
}