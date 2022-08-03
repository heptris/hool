package com.ssafy.hool.dto.emoji;

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
    private String url;
    private String name;
    private String creatorName;
    private String description;

}
