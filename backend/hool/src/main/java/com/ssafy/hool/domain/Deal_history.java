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
public class Deal_history extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "deal_history_id")
    private Long id;

    private LocalDateTime deal_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emoji_store_id")
    private Emoji_shop emojiShop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int dealPrice;
    private String seller_member_id;

    @OneToOne(mappedBy = "deal_history", fetch = FetchType.LAZY)
    private Point_history point_history;
}
