package com.ssafy.hool.controller;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.dto.conference.*;
import com.ssafy.hool.service.ConferenceService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conference")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;

    @ApiOperation(value = "응원방 리스트(메인화면)", notes = "메인화면에 보여지는 응원방 리스트. (제목, 설명, 방장 닉네임, 카테고리)")
    @GetMapping
    public ResponseEntity<List<ConferenceListResponseDto>> findAllConference(){
        return new ResponseEntity<>(conferenceService.findAllConference(), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 생성", notes = "응원방 생성 (제목, 설명, 카테고리)")
    @PostMapping("/create")
    public ResponseEntity<ConferenceResponseDto> createConference(@RequestBody ConferenceCreateDto conferenceCreateDto){
        Conference_category category = Enum.valueOf(Conference_category.class, conferenceCreateDto.getConferenceCategory());
        return new ResponseEntity<>(conferenceService.createConference(conferenceCreateDto, category), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 입장", notes = "응원방 입장 (conference_id, member_id) - openvidu 적용 시 수정 예상")
    @PostMapping("/enter")
    public ResponseEntity<String> enterConference(@RequestBody ConferenceJoinDto conferenceJoinDto){
        conferenceService.enterConference(conferenceJoinDto);
        return new ResponseEntity<>("Enter Room", HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 수정", notes = "응원방 수정 (conference_id, 제목, 설명)")
    @PostMapping("/modify")
    public ResponseEntity<ConferenceModifyResponseDto> modifyConference(@RequestBody ConferenceModifyDto conferenceModifyDto){
        return new ResponseEntity<>(conferenceService.modifyConference(conferenceModifyDto), HttpStatus.OK);
    }
}
