package com.ssafy.hool.dto.emoji;

import com.ssafy.hool.domain.emoji.EmojiAnimate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberEmojiDto {

    private Long emojiId;
    private EmojiAnimate emojiAnimate;
    private String emojiUrl;
}
