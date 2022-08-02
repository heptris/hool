package com.ssafy.hool.dto.emoji_shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiShopDto {

    private int price;
    private Long emojiId;
}
