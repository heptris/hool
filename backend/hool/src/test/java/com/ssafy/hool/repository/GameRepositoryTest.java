package com.ssafy.hool.repository;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.domain.game.Game;
import com.ssafy.hool.domain.game.Game_history;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.PointType;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.conference.ConferenceCreateDto;
import com.ssafy.hool.dto.game.GameHistoryCreateDto;
import com.ssafy.hool.dto.point_history.PointHistoryCreateDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.conference.ConferenceRepository;
import com.ssafy.hool.repository.game.GameHistoryRepository;
import com.ssafy.hool.repository.game.GameRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import com.ssafy.hool.service.game.GameService;
import com.ssafy.hool.service.member.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

//@Rollback(value = false)
@Transactional
@SpringBootTest
class GameRepositoryTest {

    @Autowired
    GameRepository gameRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    GameHistoryRepository gameHistoryRepository;
    @Autowired
    GameService gameService;
    @Autowired
    MemberService memberService;
    @Autowired
    PointHistoryRepository pointHistoryRepository;

    @Test
    public void createGameTest() {
        Member member = getMember("Lee5");
        memberService.join(member);


        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기", "SOCCER", false, "1234");

        Conference conference = Conference.createConference(conferenceCreateDto, member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        Game game = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(game);

        assertThat(gameRepository.findById(game.getId()).get()).isEqualTo(game);
    }

    @Test
    public void saveGameHistoryTest(){
        Member m = getMember("Lee11");
        memberRepository.save(m);

        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기", "SOCCER", false, "1234");

        Conference conference = Conference.createConference(conferenceCreateDto, m, Conference_category.SOCCER);
        conferenceRepository.save(conference);
        Game g = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(g);

        Member member = memberRepository.findById(m.getId()).get();
        Game game = gameRepository.findById(g.getId()).get();

        Game_history gameHistory = Game_history.createGameHistory(member, 100, true, game);
        GameHistoryCreateDto gameHistoryCreateDto = new GameHistoryCreateDto(gameHistory.getBettPoint(),
                gameHistory.getBettChoice(),
                game.getId());
        assertThrows(CustomException.class, ()->{
            gameService.createGameHistory(gameHistoryCreateDto);
        });

        assertThat(game.getGameHistoryList().get(0)).isEqualTo(gameHistory);
    }

    @Test
    public void saveGameResultTest(){
        Member m = getMember("Lee3");
        memberRepository.save(m);

        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기", "SOCCER", false, "1234");

        Conference conference = Conference.createConference(conferenceCreateDto, m, Conference_category.SOCCER);
        conferenceRepository.save(conference);
        Game g = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(g);

        Optional<Game> game = gameRepository.findById(g.getId());
        game.get().resultUpdate(true);
        gameRepository.save(game.get());

        Game resultGame = gameRepository.findById(game.get().getId()).get();
        assertTrue(resultGame.getResult());
    }

    @Test
    public void saveBettPointCalTest(){
        Member m1 = getMember("Lee");
        Member m2 = getMember("Park");
        Member m3 = getMember("Kim");
        Member m4 = getMember("Son");
        memberRepository.save(m1);
        memberRepository.save(m2);
        memberRepository.save(m3);
        memberRepository.save(m4);

        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기", "SOCCER", false, "1234");

        Conference conference = Conference.createConference(conferenceCreateDto, m1, Conference_category.SOCCER);
        conferenceRepository.save(conference);
        Game g = Game.createGame("손흥민이 2골이상 넣을까요?", true, conference);
        gameRepository.save(g);

        Game_history gameHistory1 = Game_history.createGameHistory(m1, 100, true, g);
        Game_history gameHistory2 = Game_history.createGameHistory(m2, 200, false, g);
        Game_history gameHistory3 = Game_history.createGameHistory(m3, 250, true, g);
        Game_history gameHistory4 = Game_history.createGameHistory(m4, 150, true, g);
        gameHistoryRepository.save(gameHistory1);
        gameHistoryRepository.save(gameHistory2);
        gameHistoryRepository.save(gameHistory3);
        gameHistoryRepository.save(gameHistory4);

        Game game = gameRepository.findById(g.getId()).get();
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

            PointHistoryCreateDto pointHistoryCreateDto = null;
            if(getPoint < 0){
                pointHistoryCreateDto = new PointHistoryCreateDto(game.getName() + " - 게임 승리", (int) getPoint, currentPoint, PointType.GAME);
            } else {
                pointHistoryCreateDto = new PointHistoryCreateDto(game.getName() + " - 게임 패배", (int) getPoint, currentPoint, PointType.GAME);
            }
            Point_history pointHistory = Point_history.createPointHistory(pointHistoryCreateDto, gameHistory.getMember(), null, gameHistory);
            pointHistoryRepository.save(pointHistory);
        }

        assertThat(gameHistoryList.get(0).getGetPoint()).isEqualTo(40);
        assertThat(gameHistoryList.get(0).getPointHistory().getDeal_point()).isEqualTo(40);
        assertThat(gameHistoryList.get(1).getGetPoint()).isEqualTo(0);
        assertThat(gameHistoryList.get(1).getPointHistory().getDeal_point()).isEqualTo(-200);
        assertThat(gameHistoryList.get(2).getGetPoint()).isEqualTo(100);
        assertThat(gameHistoryList.get(2).getPointHistory().getDeal_point()).isEqualTo(100);
        assertThat(gameHistoryList.get(3).getGetPoint()).isEqualTo(60);
        assertThat(gameHistoryList.get(3).getPointHistory().getDeal_point()).isEqualTo(60);


    }

    private Member getMember(String nickName) {
        Member member = Member.builder()
                .name("Lee")
                .memberEmail(nickName + "@gmail.com")
                .password("123123")
                .nickName(nickName)
                .build();
        return member;
    }
}
