package com.ssafy.hool.dto.emoji_shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiShopUpdateDto {

    private Long emojiShopId;
    private Long memberId;
    private int updatePrice;
}
