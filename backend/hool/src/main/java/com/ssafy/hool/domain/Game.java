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

    //게임생성시간
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @OneToMany(mappedBy = "game") 
    private List<Game_history> gameHistoryList = new ArrayList<>();

    public static Game createGame(String name, Boolean result) {
        Game game = Game.builder()
                .name(name)
                .gameHistoryList(new ArrayList<>())
                .result(result)
                .createdTime(LocalDateTime.now())
                .build();
        return game;
    }
}
