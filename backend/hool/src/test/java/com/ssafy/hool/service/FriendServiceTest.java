package com.ssafy.hool.service;

import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.repository.FriendRequestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Rollback(value = false)
@SpringBootTest
class FriendServiceTest {

    @Autowired
    private FriendService friendService;
    @Autowired
    private MemberService memberService;

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Test
    void 친구요청() {
        friendService.sendFriendMessage(3L, 2L);

    }

    @Test
    void 친구수락() {
        friendService.friendAccept(1L, true);
        friendService.friendAccept(4L, true);
    }

//    @Test
//    void 친구요청_메세지_조회() {
//        List<FriendRequest> friendRequestMessage = friendService.getFriendRequestMessage(2L);
//        for (FriendRequest friendRequest : friendRequestMessage) {
//            System.out.println("fromMember :"  + friendRequest.getFromMember().getNickName());
//            System.out.println("toMember : "+friendRequest.getToMember().getNickName());
//        }
//    }

    @Test
    void 친구리스트() {
        List<FriendDto> friendList = friendService.friendList(1L);
        for (FriendDto friendDto : friendList) {
            System.out.println(friendDto);
        }

    }

    @Test
    void 친구삭제() {
        friendService.deleteFriend(1L, 2L);
    }
}