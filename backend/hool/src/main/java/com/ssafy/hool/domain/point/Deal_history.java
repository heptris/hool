package com.ssafy.hool.domain.point;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Deal_history extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deal_history_id")
    private Long id;

    private LocalDateTime deal_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emoji_store_id")
    private Emoji_shop emojiShop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int dealPoint;
    private Long sellerMemberId;

    @OneToOne(mappedBy = "deal_history", fetch = FetchType.LAZY)
    private Point_history point_history;

    public static Deal_history createDealHistory(DealHistoryCreateDto dealHistoryCreateDto, Emoji_shop emojiShop, Member member){
        Deal_history dealHistory = Deal_history.builder()
                .dealPoint(dealHistoryCreateDto.getDealPoint())
                .sellerMemberId(dealHistoryCreateDto.getSellerMemberId())
                .build();

        dealHistory.addEmojiShop(emojiShop);
        dealHistory.addMember(member);
        return dealHistory;
    }

    public void addEmojiShop(Emoji_shop emojiShop){
        this.emojiShop = emojiShop;
        emojiShop.getDealHistoryList().add(this);
    }

    public void addMember(Member member){
        this.member = member;
        member.getDealHistoryList().add(this);
    }

    public void setPointHistory(Point_history pointHistory){
        this.point_history = pointHistory;
    }

}
