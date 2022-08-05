package com.ssafy.hool.controller;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.dto.conference.ConferenceCreateDto;
import com.ssafy.hool.dto.conference.ConferenceJoinDto;
import com.ssafy.hool.dto.conference.ConferenceModifyDto;
import com.ssafy.hool.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;

    @GetMapping("/conference")
    public List<Conference> findAllConference(){
        return conferenceService.findAllConference();
    }

    @PostMapping("/conference/create")
    public void createConference(@RequestBody ConferenceCreateDto conferenceCreateDto){
        Conference_category category = Enum.valueOf(Conference_category.class, conferenceCreateDto.getConferenceCategory());
        conferenceService.createConference(conferenceCreateDto, category);
    }

    @PostMapping("/conference/enter")
    public void enterConference(@RequestBody ConferenceJoinDto conferenceJoinDto){
        conferenceService.enterConference(conferenceJoinDto);
    }

    @PostMapping("/conference/modify")
    public void modifyConference(@RequestBody ConferenceModifyDto conferenceModifyDto){
        conferenceService.modifyConference(conferenceModifyDto);
    }
}
