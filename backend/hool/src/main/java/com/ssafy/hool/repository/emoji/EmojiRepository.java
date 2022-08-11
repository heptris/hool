package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.EmojiType;
import com.ssafy.hool.dto.emoji.CanEmojiDto;
import com.ssafy.hool.dto.emoji.EmojiDto;
import com.ssafy.hool.dto.emoji_shop.MemberEmojiShopDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {

    // emojiType가 MADE 인 멤버이모지 list 만들기
    @Query(value = "select es.emoji.id " +
            "from Member m join m.emojis me join me.emoji e join e.emoji_shop es " +
            "where me.member.id = :memberId and me.emojitype = com.ssafy.hool.domain.emoji.EmojiType.MADE")
    List<Long> sellingEmojis(@Param("memberId") Long memberId);

//    @Query(value = "select emoji_id " +
//            "from member_emoji where emoji_id not in (:sellingEmojiList) "
//            + "and member_id = :memberId and emoji_type = 'MADE' ", nativeQuery = true)
//    List<Long> madeByMeEmojis(@Param("sellingEmojiList") List<Long> sellingEmojiList, @Param("memberId") Long memberId);

    @Query(value = "select new com.ssafy.hool.dto.emoji.EmojiDto(e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId) " +
            "from Member_emoji me join me.emoji e where me.emoji.id not in (:sellingEmojiList) "
            + "and me.member.id = :memberId and me.emojitype = com.ssafy.hool.domain.emoji.EmojiType.MADE")
    List<EmojiDto> madeByMeEmojis(@Param("sellingEmojiList") List<Long> sellingEmojiList, @Param("memberId") Long memberId);

    @Query(value = "select new com.ssafy.hool.dto.emoji.CanEmojiDto(me.id, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId) " +
            "from Member_emoji me join me.emoji e where me.emoji.id not in (:sellingEmojiList) "
            + "and me.member.id = :memberId and me.emojitype = com.ssafy.hool.domain.emoji.EmojiType.MADE order by e.id desc")
    List<CanEmojiDto> madeByMeEmojisDescPage(@Param("sellingEmojiList") List<Long> sellingEmojiList,
                                             @Param("memberId") Long memberId, Pageable page);

    @Query(value = "select new com.ssafy.hool.dto.emoji.CanEmojiDto(me.id, e.id, e.name, e.url, e.description, e.emojiAnimate, e.creatorId) " +
            "from Member_emoji me join me.emoji e where me.emoji.id not in (:sellingEmojiList) "
            + "and me.member.id = :memberId and me.emojitype = com.ssafy.hool.domain.emoji.EmojiType.MADE " +
            "and me.id < :id order by e.id desc")
    List<CanEmojiDto> madeByMeEmojisDescLessPage(@Param("sellingEmojiList") List<Long> sellingEmojiList, @Param("memberId") Long memberId,
                                              @Param("id") Long id, Pageable page);

    @Query(value = "select count(me.id) > 0 " +
            "from Member_emoji me join me.emoji e where me.emoji.id not in (:sellingEmojiList) "
            + "and me.member.id = :memberId and me.emojitype = com.ssafy.hool.domain.emoji.EmojiType.MADE" +
            " and me.id < :id")
    Boolean existsMadeByMeEmojis(@Param("sellingEmojiList") List<Long> sellingEmojiList, @Param("memberId") Long memberId,
                                 @Param("id") Long id);

//    @Query(value = "select ~~ from Emoji_shop es join es.dealHistoryList dh group by es.id order by es.id desc")

}
