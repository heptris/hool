package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceModifyDto {
    private Long conferenceId;
    private String title;
    private String description;
}
