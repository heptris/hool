package com.ssafy.hool.repository.game;

import com.ssafy.hool.domain.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}

