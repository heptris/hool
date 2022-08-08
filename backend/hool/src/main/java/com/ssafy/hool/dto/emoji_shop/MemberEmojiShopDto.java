package com.ssafy.hool.dto.emoji_shop;

import com.ssafy.hool.domain.emoji.EmojiType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberEmojiShopDto {
    Long emojiId;
    EmojiType emojiType;
}
