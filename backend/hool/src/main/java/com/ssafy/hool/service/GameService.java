package com.ssafy.hool.service;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Game;
import com.ssafy.hool.domain.Game_history;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.GameCreateDto;
import com.ssafy.hool.repository.ConferenceRepository;
import com.ssafy.hool.repository.GameRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final ConferenceRepository conferenceRepository;

    public void saveGame(GameCreateDto gameCreateDto, String memberNickName, Long conferenceId){
        Member member = memberRepository.findByNickName(memberNickName);
        Optional<Conference> conference = conferenceRepository.findById(conferenceId);
        Game_history gameHistory = Game_history.createGameHistory(member, gameCreateDto.getBettPoint(), gameCreateDto.isBettChoice());
        Game game = Game.createGame(gameCreateDto.getGameName(), null, conference.get(), gameHistory);

        gameRepository.save(game);
    }
}
