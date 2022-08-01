package com.ssafy.hool.dto.conference;

import com.ssafy.hool.domain.Conference_category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceCreateDto {
    private String title;
    private String description;
    private String nickName;
    private String conferenceCategory;
}
