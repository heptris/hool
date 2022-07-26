package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Game;
import com.ssafy.hool.domain.Game_history;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

//    public Game_history findByMemberId(Long memberId);
    public Game findByConferenceId(Long conferenceId);
}

