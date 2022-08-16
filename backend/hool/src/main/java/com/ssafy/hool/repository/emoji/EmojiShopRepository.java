package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopListDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopRankingDto;
import org.springframework.data.domain.Pageable;
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


    @Query("select new com.ssafy.hool.dto.emoji_shop.EmojiShopListDto(es.id, es.emoji_price, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId)" +
            "from Emoji_shop es join es.emoji e order by es.id desc")
    List<EmojiShopListDto> findEmojiShopListDtoPage(Pageable page);


    @Query("select new com.ssafy.hool.dto.emoji_shop.EmojiShopListDto(es.id, es.emoji_price, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId)" +
            "from Emoji_shop es join es.emoji e where es.id < :id order by es.id desc")
    List<EmojiShopListDto> findEmojiShopListDtoLessPage(@Param("id") Long id, Pageable page);

    Boolean existsByIdLessThan(Long id);

    @Query("select new com.ssafy.hool.dto.emoji_shop.EmojiShopListDto(es.id, es.emoji_price, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId)" +
            "from Emoji_shop es join es.emoji e where e.name like %:keyword%")
    List<EmojiShopListDto> searchEmojiShop(@Param("keyword") String keyword);

    @Query("select new com.ssafy.hool.dto.emoji_shop.EmojiShopRankingDto(count (es.id), es.id, es.emoji_price, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId)" +
            "from Emoji e join e.emoji_shop es join es.dealHistoryList dh group by es.id order by (count (es.id)) desc ")
    List<EmojiShopRankingDto> rankEmojiShop(Pageable page);

}
