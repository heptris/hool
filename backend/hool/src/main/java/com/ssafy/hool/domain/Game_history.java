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

    public static Game_history createGameHistory(Member member, Game game, int bett_point, Boolean bett) {
        // getPoint 계산 메서드로 getPoint 넣기
        Game_history gameHistory = Game_history.builder()
                .bett_point(bett_point)
                .bett(bett)
                .build();
        gameHistory.addGame(game);
        gameHistory.addMember(member);
        return gameHistory;
    }

    public void addGame(Game game) {
        this.game = game;
        game.getGameHistoryList().add(this);
    }

    public void addMember(Member member) {
        this.member = member;
        member.getGameHistoryList().add(this);
    }
}
