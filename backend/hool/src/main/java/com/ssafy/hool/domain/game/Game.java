package com.ssafy.hool.domain.game;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.conference.Conference;
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
public class Game extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @Column(name = "game_name")
    private String name;

    @Column(name = "game_result")
    private Boolean result;

    @Enumerated(EnumType.STRING)
    private GameStatus gameStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @Builder.Default
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Game_history> gameHistoryList = new ArrayList<>();

    public static Game createGame(String name, Boolean result, Conference conference) {
        Game game = Game.builder()
                .name(name)
                .result(result)
                .gameStatus(GameStatus.PROGRESS)
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
        this.gameStatus = GameStatus.OVER;
    }
}
