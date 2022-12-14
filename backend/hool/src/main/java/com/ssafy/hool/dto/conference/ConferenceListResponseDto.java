package com.ssafy.hool.dto.conference;

import com.ssafy.hool.domain.conference.Conference_category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ConferenceListResponseDto {
    private Long conferenceId;
    private String title;
    private String description;
    private String nickName;
    private Conference_category category;
    private Boolean isPublic;
    private int total;
}
