package com.ssafy.hool.dto.emoji;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class EmojiCreateDto {

    private String name;
    private String url;
    private String description;
    private Long creatorId;

}
