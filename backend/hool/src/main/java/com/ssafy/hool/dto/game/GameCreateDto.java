package com.ssafy.hool.dto.game;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameCreateDto {
    // Game
    private String gameName;
    private Long conferenceId;
}
