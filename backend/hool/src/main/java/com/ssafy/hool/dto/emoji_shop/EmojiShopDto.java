package com.ssafy.hool.dto.emoji_shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EmojiShopDto {

    private int price;
    private Long emojiId;
}
