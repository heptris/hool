package com.ssafy.hool.domain;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.conference.ConferenceCreateDto;
import com.ssafy.hool.repository.conference.ConferenceRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Transactional
@Rollback(value = false)
@SpringBootTest
class ConferenceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ConferenceRepository conferenceRepository;

    @Test
    public void test() {
        Member member = Member.builder()
                .name("hanwool")
                .nickName("aaaa")
                .friends(new ArrayList<>())
                .build();

        Member member2 = Member.builder()
                .name("hanwool2")
                .nickName("aaaa2")
                .friends(new ArrayList<>())
                .memberConferenceList(new ArrayList<>())
                .build();


        memberRepository.save(member);
        memberRepository.save(member2);

        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기", "SOCCER", false, "1234");

        Conference conference = Conference.createConference(conferenceCreateDto, member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        member2.enterConference(conference);
    }
}