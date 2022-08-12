package com.ssafy.hool.controller.game;

import com.ssafy.hool.dto.game.*;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.game.GameService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @ApiOperation(value = "게임 생성", notes = "방장이 게임 생성버튼을 누르면 요청됨. (게임 이름, conference_id)")
    @PostMapping("/create")
    public ResponseEntity createGame(@RequestBody GameCreateDto gameCreateDto){
        GameResponseDto gameResponseDto = gameService.createGame(gameCreateDto);
        return new ResponseEntity<ResponseDto>(new ResponseDto<GameResponseDto>(200, "success",gameResponseDto), HttpStatus.OK);
    }

    @ApiOperation(value = "게임 기록 생성", notes = "게임 참여 인원 각각의 기록 생성. 포인트 베팅 제한시간이 지나면 한번에 요청. (베팅 포인트, 베팅 현황(True, False), 게임 진행상황(PROGRESS, OVER), 닉네임, game_id) / 방장 게임 생성 : OWNER_CREATE_GAME - 403 ERROR 방장만 게임을 만들 수 있습니다.")
    @PostMapping("/create/history")
    public ResponseEntity saveGameHistory(@RequestBody GameHistoryCreateDto gameHistoryCreateDto){
        return new ResponseEntity<ResponseDto>(new ResponseDto<GameHistoryResponseDto>(200, "success", gameService.createGameHistory(gameHistoryCreateDto)), HttpStatus.OK);
    }

    @ApiOperation(value = "게임 결과 저장", notes = "방장이 게임 결과 확정 시 요청됨. (game_id, 게임 결과(True, False)) / 방장 게임 생성 : OWNER_FINISH_GAME - 403 ERROR 방장만 게임을 종료할 수 있습니다.")
    @PostMapping("/save/result")
    public ResponseEntity saveGameResult(@RequestBody GameSaveResultDto gameSaveResultDto){
        gameService.saveGameResult(gameSaveResultDto.getGameId(), gameSaveResultDto.isResult());
        gameService.saveBettPointCal(gameSaveResultDto.getGameId());
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", "saveResult success"), HttpStatus.OK);
    }
}
