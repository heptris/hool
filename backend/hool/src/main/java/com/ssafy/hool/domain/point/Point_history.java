package com.ssafy.hool.domain.point;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.game.Game_history;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.point_history.PointHistoryCreateDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Point_history extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_history_id")
    private Long id;

    private int deal_point;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "deal_history_id")
    private Deal_history deal_history;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "game_history_id")
    private Game_history game_history;

    private int current_point;
    private String description;

    @Enumerated(EnumType.STRING)
    private PointType pointType;

    public static Point_history createPointHistory(PointHistoryCreateDto pointHistoryCreateDto, Member member, Deal_history dealHistory, Game_history gameHistory){
        Point_history pointHistory = Point_history.builder()
                .description(pointHistoryCreateDto.getDescription())
                .deal_point(pointHistoryCreateDto.getDealtPoint())
                .current_point(pointHistoryCreateDto.getCurrentPoint())
                .pointType(pointHistoryCreateDto.getPointType())
                .build();

        pointHistory.addMember(member);
        if(gameHistory != null){
            pointHistory.addGameHistory(gameHistory);
        }
        if(dealHistory != null){
            pointHistory.addDealHistory(dealHistory);
        }
        return pointHistory;
    }

    public void addMember(Member member){
        this.member = member;
        member.getPointHistoryList().add(this);
        member.setPoint(member.getPoint() + this.deal_point);
    }

    public void addDealHistory(Deal_history dealHistory){
        this.deal_history = dealHistory;
        dealHistory.setPointHistory(this);
    }

    public void addGameHistory(Game_history gameHistory){
        this.game_history = gameHistory;
        gameHistory.setPointHistory(this);
    }

}
