package com.ssafy.hool.dto.emoji_shop;

import com.ssafy.hool.domain.Emoji;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EmojiShopCreateDto {

    private Emoji emoji;
    private int price;
}
