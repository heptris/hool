package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
}
