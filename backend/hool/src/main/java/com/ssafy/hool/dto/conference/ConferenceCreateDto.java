package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceCreateDto {
    private String title;
    private String description;
    private String conferenceCategory;
    private Boolean isPublic;
    private String conferencePassword;
}
