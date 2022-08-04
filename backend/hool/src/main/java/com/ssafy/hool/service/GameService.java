package com.ssafy.hool.service;

import com.ssafy.hool.domain.*;
import com.ssafy.hool.dto.GameHistoryCreateDto;
import com.ssafy.hool.repository.*;
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
    private final PointHistoryRepository pointHistoryRepository;

    public Game saveGame(String gameName, Long conferenceId){
        Optional<Conference> conference = conferenceRepository.findById(conferenceId);
        Game game = Game.createGame(gameName, null, conference.get());
        gameRepository.save(game);
        return game;
    }
    public void saveGameHistory(GameHistoryCreateDto gameHistoryCreateDto){
        Member member = memberRepository.findByNickName(gameHistoryCreateDto.getMemberNickName());
        Game game = gameRepository.findById(gameHistoryCreateDto.getGameId()).get();

        // 회원이 보유한 포인트보다 많은 포인트를 베팅할 수 없음
        if(member.getPoint() >= gameHistoryCreateDto.getBettPoint()){
            Game_history gameHistory = Game_history.createGameHistory(member, gameHistoryCreateDto.getBettPoint(), gameHistoryCreateDto.isBettChoice(), game);
            gameHistoryRepository.save(gameHistory);
        } else {
            throw new IllegalStateException("포인트가 부족합니다.");
        }
    }

    public void saveGameResult(Long gameId, boolean result){
        Optional<Game> game = gameRepository.findById(gameId);
        game.get().resultUpdate(result);
    }

    public void saveBettPointCal(Long gameId){
        Game game = gameRepository.findById(gameId).get();
        boolean result = game.getResult();
        List<Game_history> gameHistoryList = game.getGameHistoryList();

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
            double getPoint = 0;
            int currentPoint;
            if(gameHistory.getBettChoice() == result){
                double winRate = (double)gameHistory.getBettPoint()/winPoint; // 베팅한 포인트 / 정답에 배팅된 총 포인트 = 포인트 할당 비율
                getPoint = losePoint * winRate; // 포인트 할당량
                currentPoint = gameHistory.getMember().getPoint() + (int)getPoint;
                gameHistory.gameResultUpdate((int)getPoint);
            } else {
                getPoint = -gameHistory.getBettPoint();
                currentPoint = gameHistory.getMember().getPoint() + (int)getPoint;
                gameHistory.gameResultUpdate(0); // 오답일 경우 포인트 0
            }
            Point_history pointHistory = Point_history.createPointHistory((int)getPoint, currentPoint, gameHistory.getMember(), null, gameHistory);
            pointHistoryRepository.save(pointHistory);
        }
    }
}
