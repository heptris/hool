package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceResponseDto {
    private String title;
    private String description;
    private String category;
    private int total;
}
