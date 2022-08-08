package com.ssafy.hool.dto.emoji;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiUpdateDto {

    private Long emojiId;
    private String updateName;
    private String updateDes;

}
