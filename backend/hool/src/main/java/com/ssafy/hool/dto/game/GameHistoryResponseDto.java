package com.ssafy.hool.dto.game;

import com.ssafy.hool.domain.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameHistoryResponseDto {
    private int bettPoint;
    private boolean bettChoice;
    private String memberNickName;
}
