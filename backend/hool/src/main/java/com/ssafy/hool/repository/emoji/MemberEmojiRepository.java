package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Member_emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberEmojiRepository extends JpaRepository<Member_emoji, Long> {

    @Modifying
    @Query(value = "delete from member_emoji where emoji_id = :emojiId", nativeQuery = true)
    void deleteEmoji(@Param("emojiId") Long emojiId);
}
