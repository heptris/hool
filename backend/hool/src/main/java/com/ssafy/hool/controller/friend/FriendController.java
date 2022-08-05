package com.ssafy.hool.controller.friend;

import com.ssafy.hool.dto.friend.SearchFriendReqDto;
import com.ssafy.hool.dto.friend.SendFriendMessageReqDto;
import com.ssafy.hool.dto.conference.ConferenceJoinDto;
import com.ssafy.hool.dto.friend.FriendAcceptDto;
import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.conference.ConferenceService;
import com.ssafy.hool.service.friend.FriendService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class FriendController {

    private final FriendService friendService;
    private final ConferenceService conferenceService;

    /**
     * 나의 친구 리스트 조회
     */
    @ApiOperation(value = "내 친구 목록 조회", notes = "친구의 회원id, email, 닉네임을 반환한다.(추후 프로필 주소도 포함할 예정)")
    @GetMapping("/friendList")
    public ResponseEntity<?> myFriendList() {
        Long memberId = SecurityUtil.getCurrentMemberId(); // 내 회원Id
        List<FriendDto> friendList = friendService.friendList(memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 리스트 조회", friendList), HttpStatus.OK);
    }

    /**
     * 닉네임으로 친구 추가할 친구 검색
     */
    @ApiOperation(value = "친구 요청할 친구 닉네임으로 검색", notes = "닉네임으로 검색한 친구의 회원Id, Email, 닉네임을 반환한다.")
    @PostMapping("/searchFriend")
    public ResponseEntity<?> searchFriend(@RequestBody SearchFriendReqDto searchFriendDto) {
        FriendDto friendDto = friendService.searchAddFriend(searchFriendDto.getFriendNickName());
        return new ResponseEntity<>(new ResponseDto(200, "친구 추가할 친구 검색", friendDto)
                , HttpStatus.OK);
    }

    /**
     * 친구 요청 메세지 보내기
     */
    @ApiOperation(value = "친구 요청 메세지 보내기", notes = "친구의 회원아이디로 친구 요청 메세지를 보낸다.")
    @PostMapping("/friend/add/message")
    public ResponseEntity<?> sendFriendMessage(@RequestBody SendFriendMessageReqDto sendFriendMessageReqDto) {
        Long memberId = SecurityUtil.getCurrentMemberId(); // 내 회원 id
        friendService.sendFriendMessage(memberId, sendFriendMessageReqDto.getFriendMemberId());
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 요청 메세지 보내기", null)
                , HttpStatus.OK);
    }

    /**
     * 나한테 친구 요청 온 메세지
     */
    @ApiOperation(value = "나한테 친구 요청 온 메세지", notes = "나한테 친구 요청 온 친구요청메세지Id, 친구닉네임, 친구의 회원Id" +
            "를 반환한다.")
    @GetMapping("/friend/add/message")
    public ResponseEntity<?> getFriendRequestMessage() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        List<FriendRequestDto> friendRequestMessage = friendService.getFriendRequestMessage(memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 요청 메세지", friendRequestMessage)
                , HttpStatus.OK);
    }

    /**
     * 친구 메세지 수락 / 거부
     */
    @ApiOperation(value = "친구 메세지 수락 / 거부", notes = "accept의 값이 true이면 친구 수락, false이면 수락 거부이다.")
    @PostMapping("/friend/accept")
    public ResponseEntity<?> friendAccept(@RequestBody FriendAcceptDto friendAcceptDto) {
        friendService.friendAccept(friendAcceptDto.getFriendRequestId(), friendAcceptDto.getAccept());
        return new ResponseEntity<>(new ResponseDto(200, "친구 수락", null), HttpStatus.OK);
    }

   
    @ApiOperation(value = "같이하기", notes = "친구의 응원방에 따라 들어가기")
    @PostMapping("/join/friend/conference")
    public ResponseEntity<?> joinFriendConference(@RequestBody ConferenceJoinDto conferenceJoinDto) {
        conferenceService.enterConference(conferenceJoinDto);
        return new ResponseEntity<>(new ResponseDto(200, "success", "Enter Friend Room")
                , HttpStatus.OK);
    }

    @ApiOperation(value = "초대하기", notes = "응원방으로 친구 초대하기")
    @PostMapping("/invite/friend")
    public void inviteFriend() {
        return;
    }
}
