package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConferenceModifyDto {
    private Long conferenceId;
    private String title;
    private String description;
}
