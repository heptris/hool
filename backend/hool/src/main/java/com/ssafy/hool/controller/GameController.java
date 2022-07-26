package com.ssafy.hool.controller;

import com.ssafy.hool.domain.Game;
import com.ssafy.hool.dto.GameCreateDto;
import com.ssafy.hool.dto.GameHistoryCreateDto;
import com.ssafy.hool.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/game/save")
    public ResponseEntity<Game> saveGame(@RequestBody GameCreateDto gameCreateDto){
        Game game = gameService.saveGame(gameCreateDto.getGameName(), gameCreateDto.getConferenceId());
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("/game/save/history")
    public void saveGameHistory(@RequestBody GameHistoryCreateDto gameHistoryCreateDto){
        gameService.saveGameHistory(gameHistoryCreateDto);
    }

    @PostMapping("/game/save/result")
    public void saveGameResult(@RequestParam Long gameId, @RequestParam boolean result){
        gameService.saveGameResult(gameId, result);
        gameService.saveBettPointCal(gameId);
    }
}
