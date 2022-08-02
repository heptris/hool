package com.ssafy.hool.dto.emoji;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EmojiDto {

    private String name;
    private String url;
    private String description;
    private Long creatorId;
}
