package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Game_history {

    @Id @GeneratedValue
    @Column(name = "game_history_id")
    private Long id;

    private int bett_point;

    private int get_point;

    private Boolean bett; // 베팅 현황

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

}
