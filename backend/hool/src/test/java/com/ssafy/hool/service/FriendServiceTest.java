package com.ssafy.hool.service;

import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.friend.FriendListDto;
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
        Member member = memberService.findByMemberId(1L);
        friendService.addFriendRequest(member, "네이마르");
        friendService.addFriendRequest(member, "홀란드");

    }

    @Test
    void 친구수락() {
        friendService.friendAccept(2L, 4L, true);
        friendService.friendAccept(3L, 5L, true);

    }

    @Test
    void 친구요청_메세지_조회() {
        List<FriendRequest> friendRequestMessage = friendService.getFriendRequestMessage(1L);
        for (FriendRequest friendRequest : friendRequestMessage) {
            System.out.println(friendRequest.getMember().getNickName());
        }
    }

    @Test
    void 친구리스트() {
        List<FriendListDto> friendListDtos = friendService.friendList(1L);
        for (FriendListDto friendListDto : friendListDtos) {
            System.out.println(friendListDto);
        }

    }

    @Test
    void 친구삭제() {
        friendService.deleteFriend(6L, 8L);
    }
}