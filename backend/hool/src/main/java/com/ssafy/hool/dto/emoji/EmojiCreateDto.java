package com.ssafy.hool.dto.emoji;

import com.ssafy.hool.domain.emoji.EmojiAnimate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiCreateDto {

    private String name;
//    private String url;
    private EmojiAnimate emojiAnimate;
    private String description;

}
