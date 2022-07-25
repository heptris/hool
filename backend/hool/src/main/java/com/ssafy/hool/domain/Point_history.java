package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Point_history extends BaseEntity{

    @Id @GeneratedValue
    @Column(name = "point_history_id")
    private Long id;

    private LocalDateTime point_date;
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

}
