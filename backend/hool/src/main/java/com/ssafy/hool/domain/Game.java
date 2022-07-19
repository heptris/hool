package com.ssafy.hool.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
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
}
