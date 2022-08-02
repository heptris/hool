package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Emoji_shop extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emoji_store_id")
    private Long id;

    private int emoji_price;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "emoji_id")
    private Emoji emoji;

    @Builder.Default
    @OneToMany(mappedBy = "emojiShop", cascade = CascadeType.ALL)
    private List<Deal_history> dealHistoryList = new ArrayList<>();

    public static Emoji_shop createEmojiShop(Emoji emoji, int emoji_price){
        Emoji_shop emojiShop = Emoji_shop.builder()
                .emoji_price(emoji_price)
                .build();
        emojiShop.setEmoji(emoji);
        return emojiShop;
    }

    public void setEmoji(Emoji emoji){
        this.emoji = emoji;
        emoji.setEmoji_shop(this);
    }
}
