package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    private int bettPoint;

    private int getPoint;

    private Boolean bettChoice; // 베팅현황

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToOne(mappedBy = "game_history", fetch = FetchType.LAZY)
    private Point_history pointHistory;

    private LocalDateTime createdTime;

    @Enumerated(EnumType.STRING)
    private GameStatus gameStatus;

    public static Game_history createGameHistory(Member member, int bettPoint, Boolean bett, Game game) {
        // getPoint 계산 메서드로 getPoint 넣기
        Game_history gameHistory = Game_history.builder()
                .bettPoint(bettPoint)
                .bettChoice(bett)
                .createdTime(LocalDateTime.now())
                .gameStatus(GameStatus.PROGRESS)
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

    public void gameResultUpdate(int getPoint){
        this.getPoint = getPoint;
        this.gameStatus = GameStatus.OVER;
    }
}
