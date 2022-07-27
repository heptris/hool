package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.domain.Member_conference;
import com.ssafy.hool.dto.conference.ConferenceModifyDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class ConferenceRepositoryTest {

    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberConferenceRepository memberConferenceRepository;

    @Test
    public void findAllConferenceTest(){
        List<Conference> conferenceList = conferenceRepository.findAll();
        Assertions.assertThat(conferenceList.get(0).getId()).isEqualTo(2);
    }

    @Test
    public void createConferenceTest(){
        Member member = getMember("Lee6");
        memberRepository.save(member);
        Conference conference = Conference.createConference("한국 vs 일본", "축구경기하고있어요", member, Conference_category.SOCCER);
        conferenceRepository.save(conference);
    }

    @Test
    public void enterConferenceTest(){
        Member member = getMember("Park0");
        memberRepository.save(member);
        Conference conference = Conference.createConference("한국 vs 일본", "축구경기", member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        Member member1 = getMember("Park1");
        Member member2 = getMember("Park2");
        Member member3 = getMember("Park3");
        Member member4 = getMember("Park4");

        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);
        memberRepository.save(member4);

        Member_conference memberConference1 = Member_conference.createMemberConference(member1, conference);
        Member_conference memberConference2 = Member_conference.createMemberConference(member2, conference);
        Member_conference memberConference3 = Member_conference.createMemberConference(member3, conference);
        Member_conference memberConference4 = Member_conference.createMemberConference(member4, conference);

        memberConferenceRepository.save(memberConference1);
        memberConferenceRepository.save(memberConference2);
        memberConferenceRepository.save(memberConference3);
        memberConferenceRepository.save(memberConference4);
    }

    @Test
    public void modifyConferenceTest(){
//        Member member = getMember("con");
//        Conference conference = Conference.createConference("한국 vs 일본", member, Conference_category.SOCCER);
//        conferenceRepository.save(conference);

        Optional<Conference> conference = conferenceRepository.findById(41l);
        ConferenceModifyDto conferenceModifyDto = new ConferenceModifyDto(41l, "한국 vs 중국", "예에");
        conference.get().modifyConference(conferenceModifyDto);
        Assertions.assertThat(conference.get().getTitle()).isEqualTo("한국 vs 중국");
        Assertions.assertThat(conference.get().getDescription()).isEqualTo("예에");
    }

    private Member getMember(String nickName) {
        return Member.builder()
                .name("Lee")
                .memberEmail(nickName + "@gmail.com")
                .password("123123")
                .nickName(nickName)
                .build();
    }
}