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
public class DetailMemberEmojiDto {

    private Long emojiId;
    private String emojiUrl;
    private String name;
    private String description;
    private EmojiAnimate emojiAnimate;
    private Long memberEmojiId;
    private Boolean isFavorite;

}
