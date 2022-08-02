package com.ssafy.hool.dto.conference;

import com.ssafy.hool.domain.Conference_category;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConferenceListResponseDto {
    private String title;
    private String description;
    private String nickName;
    private Conference_category category;
    private int total;
}
