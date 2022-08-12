package com.ssafy.hool.controller.friend;

import com.ssafy.hool.dto.friend.*;
import com.ssafy.hool.dto.conference.ConferenceJoinDto;
import com.ssafy.hool.dto.response.CursorFriendListResult;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.conference.ConferenceService;
import com.ssafy.hool.service.friend.FriendRequestService;
import com.ssafy.hool.service.friend.FriendService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/friend")
@RestController
public class FriendController {

    private static final int DEFAULT_SIZE = 1;
    private final FriendService friendService;
    private final ConferenceService conferenceService;


    /**
     * 나의 친구 리스트 조회
     */
    @ApiOperation(value = "내 친구 목록 조회", notes = "친구의 회원id, email, 닉네임을 반환한다.(추후 프로필 주소도 포함할 예정)")
    @GetMapping("/list")
    public ResponseEntity<?> myFriendList() {
        Long memberId = SecurityUtil.getCurrentMemberId(); // 내 회원Id
        List<FriendDto> friendList = friendService.friendList(memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 리스트 조회", friendList), HttpStatus.OK);
    }

    @ApiOperation(value = "친구 목록 조회(페이징)", notes = "가장 최근에 로그인 한 친구부터 반환")
    @GetMapping("/list/page")
    public ResponseEntity<?> myFriendListPage(String friendCursorTime, Integer size) {
        if(size == null) size = DEFAULT_SIZE;
        Long memberId = SecurityUtil.getCurrentMemberId();
        CursorFriendListResult<FriendDto> friendDtoCursorFriendListResult = friendService.get(memberId, friendCursorTime, PageRequest.of(0, size));
        return new ResponseEntity<>(new ResponseDto(200, "success", friendDtoCursorFriendListResult)
                , HttpStatus.OK);
    }


    /**
     * 닉네임으로 친구 추가할 친구 검색
     */
    @ApiOperation(value = "친구 요청할 친구 닉네임으로 검색", notes = "닉네임으로 검색한 친구의 회원Id, Email, 닉네임을 반환한다.")
    @PostMapping("/search")
    public ResponseEntity<?> searchFriend(@RequestBody SearchFriendReqDto searchFriendDto) {
        FriendDto friendDto = friendService.searchAddFriend(searchFriendDto.getFriendNickName());
        return new ResponseEntity<>(new ResponseDto(200, "친구 추가할 친구 검색", friendDto)
                , HttpStatus.OK);
    }


    @ApiOperation(value = "같이하기", notes = "친구의 응원방에 따라 들어가기")
    @PostMapping("/join/conference")
    public ResponseEntity<?> joinFriendConference(@RequestBody ConferenceJoinDto conferenceJoinDto) {
        conferenceService.enterConference(conferenceJoinDto, SecurityUtil.getCurrentMemberId());
        return new ResponseEntity<>(new ResponseDto(200, "success", "Enter Friend Room")
                , HttpStatus.OK);
    }

    /**
     * 초대하기
     */
    
}
