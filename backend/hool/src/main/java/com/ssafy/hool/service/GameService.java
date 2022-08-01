package com.ssafy.hool.service;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Game;
import com.ssafy.hool.domain.Game_history;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.GameHistoryCreateDto;
import com.ssafy.hool.repository.ConferenceRepository;
import com.ssafy.hool.repository.GameHistoryRepository;
import com.ssafy.hool.repository.GameRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class GameService {
    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final ConferenceRepository conferenceRepository;
    private final GameHistoryRepository gameHistoryRepository;

    public Game saveGame(String gameName, Long conferenceId){
        Optional<Conference> conference = conferenceRepository.findById(conferenceId);
        Game game = Game.createGame(gameName, null, conference.get());
        gameRepository.save(game);
        return game;
    }
    public void saveGameHistory(GameHistoryCreateDto gameHistoryCreateDto){
        Member member = memberRepository.findByNickName(gameHistoryCreateDto.getMemberNickName()).get();
        Optional<Game> game = gameRepository.findById(gameHistoryCreateDto.getGameId());
        Game_history gameHistory = Game_history.createGameHistory(member, gameHistoryCreateDto.getBettPoint(), gameHistoryCreateDto.isBettChoice(), game.get());
        gameHistoryRepository.save(gameHistory);
    }

    public void saveGameResult(Long gameId, boolean result){
        Optional<Game> game = gameRepository.findById(gameId);
        game.get().resultUpdate(result);
    }

    public void saveBettPointCal(Long gameId){
        Optional<Game> game = gameRepository.findById(gameId);
        boolean result = game.get().getResult();
        List<Game_history> gameHistoryList = game.get().getGameHistoryList();

        int winPoint = 0, losePoint = 0;

        // O, X에 베팅된 각각 총 Point 합산
        for(Game_history gameHistory : gameHistoryList){
            if(gameHistory.getBettChoice() == result){
                winPoint += gameHistory.getBettPoint();
            } else {
                losePoint += gameHistory.getBettPoint();
            }
        }

        // 포인트 계산
        for(Game_history gameHistory : gameHistoryList){
            if(gameHistory.getBettChoice() == result){
                double winRate = (double)gameHistory.getBettPoint()/winPoint; // 베팅한 포인트 / 정답에 배팅된 총 포인트 = 포인트 할당 비율
                double getPoint = losePoint * winRate; // 포인트 할당량
                gameHistory.gameResultUpdate((int)getPoint);
            } else {
                gameHistory.gameResultUpdate(0); // 오답일 경우 포인트 0
            }
        }
    }
}
