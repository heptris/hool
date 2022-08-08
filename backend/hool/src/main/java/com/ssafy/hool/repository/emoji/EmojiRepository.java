package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.EmojiType;
import com.ssafy.hool.dto.emoji.EmojiDto;
import com.ssafy.hool.dto.emoji_shop.MemberEmojiShopDto;
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

    @Query(value = "select new com.ssafy.hool.dto.emoji.EmojiDto(e.name, e.url, e.description, m.id) " +
            "from Member_emoji me join me.member m join me.emoji e where me.emoji.id not in (:sellingEmojiList)")
    List<EmojiDto> madeByMeEmojis(@Param("sellingEmojiList") List<Long> sellingEmojiList);
}
