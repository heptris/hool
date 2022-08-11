package com.ssafy.hool.dto.emoji;

import com.ssafy.hool.domain.emoji.EmojiAnimate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CanEmojiDto {

    private Long memberEmojiId;
    private Long emojiId;
    private String name;
    private String url;
    private String description;
    private EmojiAnimate emojiAnimate;
    private Long creatorId;
}
