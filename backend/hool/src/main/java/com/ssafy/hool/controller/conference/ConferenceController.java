package com.ssafy.hool.controller.conference;

import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.dto.conference.*;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.conference.ConferenceService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conference")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;

    @ApiOperation(value = "응원방 생성", notes = "응원방 생성 (제목, 설명, 카테고리-SOCCER, BASEBALL, BASKETBALL, VOLLEYBALL, ESPORTS)")
    @PostMapping("/create")
    public ResponseEntity createConference(@RequestBody ConferenceCreateDto conferenceCreateDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        Conference_category category = Enum.valueOf(Conference_category.class, conferenceCreateDto.getConferenceCategory());
        return new ResponseEntity<ResponseDto>(new ResponseDto<ConferenceResponseDto>(200, "success", conferenceService.createConference(conferenceCreateDto, category, memberId)), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 입장", notes = "응원방 입장 (conference_id, member_id) - openvidu 적용 시 수정 예상")
    @PostMapping("/enter")
    public ResponseEntity enterConference(@RequestBody ConferenceJoinDto conferenceJoinDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        conferenceService.enterConference(conferenceJoinDto, memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success","Enter Room"), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 입장 - 방 비밀번호 확인", notes = "응원방 비밀번호 체크(conferenceId, password)")
    @PostMapping("/enter/check")
    public ResponseEntity enterCheckConference(@RequestBody ConferenceJoinCheckDto conferenceJoinCheckDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        conferenceService.enterCheckConference(conferenceJoinCheckDto, memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success","Enter Room"), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 수정", notes = "응원방 수정 (conference_id, 제목, 설명)")
    @PostMapping("/modify")
    public ResponseEntity modifyConference(@RequestBody ConferenceModifyDto conferenceModifyDto){
        return new ResponseEntity<ResponseDto>(new ResponseDto<ConferenceModifyResponseDto>(200, "success", conferenceService.modifyConference(conferenceModifyDto)), HttpStatus.OK);
    }

    @ApiOperation(value = "응원방 나가기", notes = "응원방 나가기")
    @PostMapping("/exit")
    public ResponseEntity exitConference(@RequestBody ConferenceExitDto conferenceExitDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        conferenceService.exitConference(conferenceExitDto, memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", "Exit Room"), HttpStatus.OK);
    }

}
