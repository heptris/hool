package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Rollback(value = false)
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    FriendRepository friendRepository;

    @Test
    public void test() {

        Member member = Member.builder()
                .name("hanwool")
                .nickName("aaaa")
                .friends(new ArrayList<>())
                .build();

        Member member2 = Member.builder()
                .name("hanwool2")
                .nickName("bbbb")
                .friends(new ArrayList<>())
                .build();

        memberRepository.save(member);
        memberRepository.save(member2);

        Member member3 = memberRepository.findByNickName("bbbb");

        Friend friend = Friend.createFriend(member, member3.getNickName(), member3.getName()); // 나 -> 친구추가
        friendRepository.save(friend);


        Friend friend1 = Friend.createFriend(member3, member.getNickName(), member.getName());//친구 -> 나 추가
        friendRepository.save(friend1);

    }

}