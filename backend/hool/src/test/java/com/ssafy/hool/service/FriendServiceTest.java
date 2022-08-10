package com.ssafy.hool.service;

import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import com.ssafy.hool.repository.friend.FriendRequestRepository;
import com.ssafy.hool.service.friend.FriendService;
import com.ssafy.hool.service.member.MemberService;
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

    @Test
    void 친구요청() {
        friendService.sendFriendMessage(1L, 2L);
        friendService.sendFriendMessage(1L, 3L);
        friendService.sendFriendMessage(2L, 3L);

    }

    @Test
    void 친구수락() {
        friendService.friendAccept(2L, true);
        friendService.friendAccept(3L, true);
    }

    @Test
    void 친구요청_메세지_조회() {
        List<FriendRequestDto> friendRequestMessage = friendService.getFriendRequestMessage(3L);
        for (FriendRequestDto friendRequest : friendRequestMessage) {
            System.out.println(friendRequest);
        }
    }

    @Test
    void 친구리스트() {
        List<FriendDto> friendList = friendService.friendList(4L);
        for (FriendDto friendDto : friendList) {
            System.out.println(friendDto);
        }
    }

    @Test
    void 친구삭제() {
        friendService.deleteFriend(3L, 2L);
    }
}