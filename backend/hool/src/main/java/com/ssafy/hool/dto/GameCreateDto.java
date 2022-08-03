package com.ssafy.hool.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameCreateDto {
    // Game
    private String gameName;
    private Long conferenceId;
    private LocalDateTime createdTime;
    private boolean gameResult;
}
