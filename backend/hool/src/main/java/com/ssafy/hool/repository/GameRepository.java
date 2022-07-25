package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
