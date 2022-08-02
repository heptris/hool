package com.ssafy.hool.repository.game;

import com.ssafy.hool.domain.game.Game_history;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameHistoryRepository extends JpaRepository<Game_history, Long> {
    Game_history findByMemberId(Long memberId);
}

