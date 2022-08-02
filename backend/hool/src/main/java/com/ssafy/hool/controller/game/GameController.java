package com.ssafy.hool.controller.game;

import com.ssafy.hool.dto.game.*;
import com.ssafy.hool.service.game.GameService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @ApiOperation(value = "게임 생성", notes = "방장이 게임 생성버튼을 누르면 요청됨. (게임 이름, conference_id)")
    @PostMapping("/create")
    public ResponseEntity<GameResponseDto> createGame(@RequestBody GameCreateDto gameCreateDto){
        GameResponseDto gameResponseDto = gameService.createGame(gameCreateDto);
        return new ResponseEntity<>(gameResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "게임 기록 생성", notes = "게임 참여 인원 각각의 기록 생성. 포인트 베팅 제한시간이 지나면 한번에 요청. (베팅 포인트, 베팅 현황(True, False), 게임 진행상황(PROGRESS, OVER), 닉네임, game_id)")
    @PostMapping("/create/history")
    public ResponseEntity<GameHistoryResponseDto> saveGameHistory(@RequestBody GameHistoryCreateDto gameHistoryCreateDto){
        return new ResponseEntity<>(gameService.createGameHistory(gameHistoryCreateDto), HttpStatus.OK);
    }

    @ApiOperation(value = "게임 결과 저장", notes = "방장이 게임 결과 확정 시 요청됨. (game_id, 게임 결과(True, False))")
    @PostMapping("/save/result")
    public ResponseEntity<String> saveGameResult(@RequestBody GameSaveResultDto gameSaveResultDto){
        gameService.saveGameResult(gameSaveResultDto.getGameId(), gameSaveResultDto.isResult());
        gameService.saveBettPointCal(gameSaveResultDto.getGameId());
        return new ResponseEntity<>("saveResult success", HttpStatus.OK);
    }
}
