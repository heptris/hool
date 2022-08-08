package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji_shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmojiShopRepository extends JpaRepository<Emoji_shop, Long> {

    @Modifying
    @Query(value = "delete from emoji_shop where emoji_store_id = :emojiShopId", nativeQuery = true)
    void deleteEmojiShop(@Param("emojiShopId") Long emojiShopId);


    @Query(value = "select count(me.id) from emoji_shop me where me.emoji_id = :emojiId", nativeQuery = true)
    int checkEmojiShop(@Param("emojiId") Long emojiId);
}
