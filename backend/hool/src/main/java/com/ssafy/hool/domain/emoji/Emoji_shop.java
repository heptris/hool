package com.ssafy.hool.domain.emoji;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.point.Deal_history;
import com.ssafy.hool.dto.emoji_shop.EmojiShopRankingDto;
import io.swagger.models.auth.In;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
//@NamedNativeQuery(
//        name = "find_emoji_shop_ranking_dto",
//        query =
//                "SELECT " +
//                        " count(es.emoji_store_id) as countId, " +
//                        " es.emoji_store_id as emojiShopId, " +
//                        " es.emoji_price as emojiShopPrice, " +
//                        " e.emoji_id as emojiId," +
//                        " e.name as emojiName," +
//                        " e.url as emojiUrl," +
//                        " e.description as emojiDescription," +
//                        " e.emoji_animate as emojiAnimate," +
//                        " e.creator_id as emojiCreatorId " +
//                        "FROM emoji_shop es " +
//                        "join deal_history dh " +
//                        "on es.emoji_store_id = dh.emoji_store_id " +
//                        "join emoji e " +
//                        "on es.emoji_id = e.emoji_id " +
//                        "group by es.emoji_store_id " +
//                        "limit 10",
//        resultSetMapping = "emoji_shop_ranking_dto"
//)
//@SqlResultSetMapping(
//        name = "emoji_shop_ranking_dto",
//        classes = @ConstructorResult(
//                targetClass = EmojiShopRankingDto.class,
//                columns = {
//                        @ColumnResult(name = "countId", type = Long.class),
//                        @ColumnResult(name = "emojiShopId", type = Long.class),
//                        @ColumnResult(name = "emojiShopPrice", type = Integer.class),
//                        @ColumnResult(name = "emojiId", type = Long.class),
//                        @ColumnResult(name = "emojiName", type = String.class),
//                        @ColumnResult(name = "emojiUrl", type = String.class),
//                        @ColumnResult(name = "emojiDescription", type = String.class),
//                        @ColumnResult(name = "emojiAnimate", type = EmojiAnimate.class),
//                        @ColumnResult(name = "emojiCreatorId", type = Long.class)
//                }
//        )
//)
public class Emoji_shop extends BaseEntity {

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
