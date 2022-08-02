package com.ssafy.hool.dto.emoji_shop;

import com.ssafy.hool.domain.emoji.Emoji;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiShopCreateDto {

    private Emoji emoji;
    private int price;
}
