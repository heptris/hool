package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Rollback(value = false)
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    FriendRepository friendRepository;

    @Test
    public void test() {

        Member member = Member.builder()
                .name("hanwool")
                .friends(new ArrayList<>())
                .build();


        Friend friend = Friend.createFriend();
        Friend friend2 = Friend.createFriend();
        member.addFriend(friend);
        member.addFriend(friend2);
        memberRepository.save(member);

        Assertions.assertThat(member.getFriends().size()).isEqualTo(2);

    }

}