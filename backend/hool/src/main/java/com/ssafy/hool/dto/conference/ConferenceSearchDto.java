package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceSearchDto {
    private String conferenceCategory;
    private Long cursorId;
    private Integer size;
}
