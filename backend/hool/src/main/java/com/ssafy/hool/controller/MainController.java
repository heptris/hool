package com.ssafy.hool.controller;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.conference.ConferenceService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MainController {

    private static final int Default_SIZE = 2;
    @Autowired
    private ConferenceService conferenceService;

    @ApiOperation(value = "응원방 리스트(메인화면)", notes = "메인화면에 보여지는 응원방 리스트. (제목, 설명, 방장 닉네임, 카테고리, 인원수)")
    @GetMapping("/")
    public ResponseEntity findAllConference(){
        return new ResponseEntity<ResponseDto>(new ResponseDto<List<ConferenceListResponseDto>>(200, "success", conferenceService.findAllConference()), HttpStatus.OK);
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }


    @GetMapping("/page")
    public ResponseEntity findConferenceByPage(Long cursorId, Integer size) {
        if(size == null) size = Default_SIZE;
        CursorResult<ConferenceListResponseDto> conferenceCursorResult = conferenceService.get(cursorId, PageRequest.of(0, size));
        return new ResponseEntity(new ResponseDto(200, "success", conferenceCursorResult)
                , HttpStatus.OK);
    }
}
