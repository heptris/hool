package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConferenceResponseDto {
    private String title;
    private String description;
    private String category;
    private int total;
}
