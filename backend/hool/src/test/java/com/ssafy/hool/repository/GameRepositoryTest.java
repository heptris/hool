package com.ssafy.hool.repository;

import com.ssafy.hool.domain.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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

    @Test
    public void test() {
        Member member = Member.builder()
                .name("hanwool")
                .nickName("aaaa")
                .friends(new ArrayList<>())
                .gameHistoryList(new ArrayList<>())
                .build();
        memberRepository.save(member);

        Conference conference = Conference.createConference("123", member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        Game_history gameHistory = Game_history.createGameHistory(member, 100, true);

        Game game = Game.createGame("손흥민이 2골이상 넣을까요?", null, conference, gameHistory);

        gameRepository.save(game);
    }
}