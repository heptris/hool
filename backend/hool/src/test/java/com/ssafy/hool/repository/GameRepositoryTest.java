package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Game;
import com.ssafy.hool.domain.Game_history;
import com.ssafy.hool.domain.Member;
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

    @Test
    public void test() {
        Member member = Member.builder()
                .name("hanwool")
                .nickName("aaaa")
                .friends(new ArrayList<>())
                .gameHistoryList(new ArrayList<>())
                .build();
        memberRepository.save(member);

        Game game = Game.createGame("손흥민이 2골이상 넣을까요?", true);
        Member me = memberRepository.findById(1L).get();

        Game_history gameHistory = Game_history.createGameHistory(me, game, 30, false);
        gameRepository.save(game);
    }
}