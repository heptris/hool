package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmojiShopRepository extends JpaRepository<Emoji_shop, Long> {

    @Modifying
    @Query(value = "delete from emoji_shop where emoji_store_id = :emojiShopId", nativeQuery = true)
    void deleteEmojiShop(@Param("emojiShopId") Long emojiShopId);

    @Query(value = "select new com.ssafy.hool.dto.emoji_shop.EmojiShopDto(es.emoji_price, es.emoji.id) from Emoji_shop es")
    List<EmojiShopDto> getEmojiShop();

    @Query(value = "select count(me.id) from emoji_shop me where me.emoji_id = :emojiId", nativeQuery = true)
    int checkEmojiShop(@Param("emojiId") Long emojiId);




}
