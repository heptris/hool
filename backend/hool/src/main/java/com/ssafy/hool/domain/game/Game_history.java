package com.ssafy.hool.domain.game;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.domain.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Game_history extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Enumerated(EnumType.STRING)
    private GameStatus gameStatus;

    public static Game_history createGameHistory(Member member, int bettPoint, Boolean bett, Game game) {
        // getPoint 계산 메서드로 getPoint 넣기
        Game_history gameHistory = Game_history.builder()
                .bettPoint(bettPoint)
                .bettChoice(bett)
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

    public void setPointHistory(Point_history pointHistory){
        this.pointHistory = pointHistory;
    }
}
