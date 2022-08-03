package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Game {

    @Id
    @GeneratedValue
    @Column(name = "game_id")
    private Long id;

    @Column(name = "game_name")
    private String name;

    @Column(name = "game_result")
    private Boolean result;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    //게임생성시간
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder.Default
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Game_history> gameHistoryList = new ArrayList<>();

    public static Game createGame(String name, Boolean result, Conference conference) {
        Game game = Game.builder()
                .name(name)
                .result(result)
                .createdTime(LocalDateTime.now())
                .build();
        game.addConference(conference);
        return game;
    }

    public void addConference(Conference conference){
        this.conference = conference;
        conference.getGames().add(this);
    }

    public void addGameHistory(Game_history gameHistory){
        getGameHistoryList().add(gameHistory);
        gameHistory.addGame(this);
    }

    public void resultUpdate(boolean result){
        this.result = result;
    }
}
