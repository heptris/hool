package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.dto.emoji.MemberEmojiDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface MemberEmojiRepository extends JpaRepository<Member_emoji, Long> {

    @Modifying
    @Query(value = "delete from member_emoji where emoji_id = :emojiId and member_id = :memberId", nativeQuery = true)
    void deleteEmoji(@Param("emojiId") Long emojiId, @Param("memberId") Long memberId);

    @Query("select new com.ssafy.hool.dto.emoji.MemberEmojiDto(e.id, e.url) from Member_emoji me join me.member m join me.emoji e " +
            "where m.id = :memberId")
    List<MemberEmojiDto> getMyEmojis(@Param("memberId") Long memberId);

    @Query("select new com.ssafy.hool.dto.emoji.MemberEmojiDto(e.id, e.url) from Member_emoji me join me.member m join me.emoji e " +
            "where m.id = :memberId and me.is_favorite = true")
    List<MemberEmojiDto> getFavoriteEmojis(@Param("memberId") Long memberId);

    @Query("select me from Member_emoji me where me.emoji.id = :emojiId and me.member.id = :memberId")
    Member_emoji findByMemberIdAndEmojiId(@Param("memberId") Long memberId, @Param("emojiId") Long emojiId);
}
