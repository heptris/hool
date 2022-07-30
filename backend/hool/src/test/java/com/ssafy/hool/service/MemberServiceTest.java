package com.ssafy.hool.service;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.repository.FriendRepository;
import com.ssafy.hool.repository.FriendRequestRepository;
import com.ssafy.hool.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private FriendRepository friendRepository;

    @Test
    void 중복_닉네임_체크() {
        boolean check = memberService.existsByNickName("messi");
        Assertions.assertThat(check).isEqualTo(true);
    }

    @Test
    void 회원가입() {
        Member member = new Member();
        member.setNickName("음바페");
        memberService.join(member);

        Member member2 = new Member();
        member2.setNickName("네이마르");
        memberService.join(member2);

        Member member3 = new Member();
        member3.setNickName("홀란드");
        memberService.join(member3);
    }


    @Test
    void 회원탈퇴() {
        memberService.deleteMember(1L);
    }

    @Test
    void 회원수정() {
        memberService.updateMember(1L, "1235", "회원", "음바페1");
    }

    @Test
    void 친구얼마나있는지() {
        int friendCount = memberService.getFriendCount(1L);
        Assertions.assertThat(friendCount).isEqualTo(2);
        int friendCount2 = memberService.getFriendCount(2L);
        Assertions.assertThat(friendCount2).isEqualTo(1);

    }

    @Test
    void 테스트() {
        Date now = new Date();
        System.out.println(now.getTime());
    }

    @Test
    void 회원조회() {
        Member member = memberService.findByMemberId(20L);
    }
}