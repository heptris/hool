package com.ssafy.hool.controller.friend;

import com.ssafy.hool.dto.friend.FriendAcceptDto;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import com.ssafy.hool.dto.friend.SendFriendMessageReqDto;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.friend.FriendRequestService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api/friendrequest")
@RequiredArgsConstructor
@Controller
public class FriendRequestController {

    private final FriendRequestService friendRequestService;

    private static final int DEFAULT_SIZE = 1;

    /**
     * 친구 요청 메세지 보내기
     */
    @ApiOperation(value = "친구 요청 메세지 보내기", notes = "친구의 회원아이디로 친구 요청 메세지를 보낸다.")
    @PostMapping("/send/message")
    public ResponseEntity<?> sendFriendMessage(@RequestBody SendFriendMessageReqDto sendFriendMessageReqDto) {
        Long memberId = SecurityUtil.getCurrentMemberId(); // 내 회원 id
        friendRequestService.sendFriendMessage(memberId, sendFriendMessageReqDto.getFriendMemberId());
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 요청 메세지 보내기", null)
                , HttpStatus.OK);
    }

    /**
     * 나한테 친구 요청 온 메세지
     */
    @ApiOperation(value = "나한테 친구 요청 온 메세지", notes = "나한테 친구 요청 온 친구요청메세지Id, 친구닉네임, 친구의 회원Id" +
            "를 반환한다.")
    @GetMapping("/send/message")
    public ResponseEntity<?> getFriendRequestMessage() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        List<FriendRequestDto> friendRequestMessage = friendRequestService.getFriendRequestMessage(memberId);
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "친구 요청 메세지", friendRequestMessage)
                , HttpStatus.OK);
    }

    @ApiOperation(value = "나한테 온 친구 요청 메세지 (페이징)", notes = "페이징 처리")
    @GetMapping("/send/message/page")
    public ResponseEntity<?> myFriendListPage(Long cursorId, Integer size) {
        if (size == null) size = DEFAULT_SIZE;
        Long memberId = SecurityUtil.getCurrentMemberId();
        CursorResult<FriendRequestDto> friendRequestDtoCursorResult = friendRequestService.get(memberId, cursorId, PageRequest.of(0, size));
        return new ResponseEntity<>(new ResponseDto<>(200, "success", friendRequestDtoCursorResult)
                , HttpStatus.OK);

    }

    /**
     * 친구 메세지 수락 / 거부
     */
    @ApiOperation(value = "친구 메세지 수락 / 거부", notes = "accept의 값이 true이면 친구 수락, false이면 수락 거부이다.")
    @PostMapping("/accept")
    public ResponseEntity<?> friendAccept(@RequestBody FriendAcceptDto friendAcceptDto) {
        friendRequestService.friendAccept(friendAcceptDto.getFriendRequestId(), friendAcceptDto.getAccept());
        return new ResponseEntity<>(new ResponseDto(200, "친구 수락", null), HttpStatus.OK);
    }

}
