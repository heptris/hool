package com.ssafy.hool.dto.emoji;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EmojiUpdateDto {

    private Long emojiId;
    private Long memberId;
    private String updateName;
    private String updateDes;

}
