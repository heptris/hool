package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "game")
    private List<Game_history> gameHistoryList = new ArrayList<>();

    public static Game eateGame(String name) {
        Game game = Game.builder()
                .name(name)
                .build();
        return game;
    }
}
