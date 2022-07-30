package com.ssafy.hool.repository;

import com.ssafy.hool.domain.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Rollback(value = false)
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

    @Test
    public void saveGameTest() {
        Member member = getMember("Lee1");
        memberRepository.save(member);

        Conference conference = Conference.createConference("123", member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        Game game = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(game);

        assertThat(gameRepository.findById(game.getId()).get()).isEqualTo(game);
    }

    @Test
    public void saveGameHistoryTest(){
        Member m = getMember("Lee2");
        memberRepository.save(m);
        Conference conference = Conference.createConference("123", m, Conference_category.SOCCER);
        conferenceRepository.save(conference);
        Game g = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(g);

        Member member = memberRepository.findByNickName("Lee2").get();
        Optional<Game> game = gameRepository.findById(g.getId());

        Game_history gameHistory = Game_history.createGameHistory(member, 100, true, game.get());
        gameHistoryRepository.save(gameHistory);

        assertThat(game.get().getGameHistoryList().get(0)).isEqualTo(gameHistory);
    }

    @Test
    public void saveGameResultTest(){
        Member m = getMember("Lee3");
        memberRepository.save(m);
        Conference conference = Conference.createConference("123", m, Conference_category.SOCCER);
        conferenceRepository.save(conference);
        Game g = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference);
        gameRepository.save(g);

        Optional<Game> game = gameRepository.findById(g.getId());
        game.get().resultUpdate(true);
        gameRepository.save(game.get());

        Optional<Game> resultGame = gameRepository.findById(game.get().getId());
        assertTrue(resultGame.get().getResult());
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
        Conference conference = Conference.createConference("123", m1, Conference_category.SOCCER);
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

        Optional<Game> game = gameRepository.findById(g.getId());
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

        assertThat(gameHistoryList.get(0).getGetPoint()).isEqualTo(40);
        assertThat(gameHistoryList.get(1).getGetPoint()).isEqualTo(0);
        assertThat(gameHistoryList.get(2).getGetPoint()).isEqualTo(100);
        assertThat(gameHistoryList.get(3).getGetPoint()).isEqualTo(60);
    }

    private Member getMember(String nickName) {
        Member member = Member.builder()
                .name("Lee")
                .memberEmail(nickName + "@gmail.com")
                .password("123123")
                .nickName(nickName)
                .friends(new ArrayList<>())
                .emojis(new ArrayList<>())
                .dealHistoryList(new ArrayList<>())
                .pointHistoryList(new ArrayList<>())
                .memberConferenceList(new ArrayList<>())
                .gameHistoryList(new ArrayList<>())
                .build();
        return member;
    }
}