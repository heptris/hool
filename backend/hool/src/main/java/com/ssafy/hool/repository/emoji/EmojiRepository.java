package com.ssafy.hool.repository.emoji;

import com.ssafy.hool.domain.emoji.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
}
