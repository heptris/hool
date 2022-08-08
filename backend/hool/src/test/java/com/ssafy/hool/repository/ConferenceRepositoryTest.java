package com.ssafy.hool.repository;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.domain.conference.EnterStatus;
import com.ssafy.hool.domain.conference.Member_conference;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.member.MemberStatus;
import com.ssafy.hool.dto.conference.*;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.exception.ex.ErrorCode;
import com.ssafy.hool.repository.conference.ConferenceRepository;
import com.ssafy.hool.repository.conference.MemberConferenceRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.conference.ConferenceService;
import com.ssafy.hool.service.member.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class ConferenceRepositoryTest {

    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberConferenceRepository memberConferenceRepository;
    @Autowired
    MemberService memberService;
    @Autowired
    ConferenceService conferenceService;
    @Test
    public void findAllConferenceTest(){
        Member member1 = getMember("손흥민");
        Member member2 = getMember("박지성");
        Member member3 = getMember("김민재");

        memberService.join(member1);
        memberService.join(member2);
        memberService.join(member3);

        ConferenceCreateDto conferenceCreateDto1 = new ConferenceCreateDto("Title1", "Description1", "SOCCER");
        ConferenceCreateDto conferenceCreateDto2 = new ConferenceCreateDto("Title2", "Description2", "BASEBALL");
        ConferenceCreateDto conferenceCreateDto3 = new ConferenceCreateDto("Title3", "Description3", "BASKETBALL");

        conferenceService.createConference(conferenceCreateDto1, Conference_category.SOCCER, member1.getId());
        conferenceService.createConference(conferenceCreateDto2, Conference_category.BASEBALL, member2.getId());
        conferenceService.createConference(conferenceCreateDto3, Conference_category.BASKETBALL, member3.getId());

        List<ConferenceListResponseDto> conferenceList = conferenceRepository.findConferenceListDto();
        assertThat(conferenceList.get(4).getTitle()).isEqualTo("Title1");
        assertThat(conferenceList.get(4).getDescription()).isEqualTo("Description1");
        assertThat(conferenceList.size()).isEqualTo(7);
    }

    @Test
    public void createConferenceTest(){
        Member member = getMember("Lee");
        memberService.join(member);
        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기하고있어요", "SOCCER");

        Conference_category category = Enum.valueOf(Conference_category.class, conferenceCreateDto.getConferenceCategory());

        ConferenceResponseDto conferenceResponseDto = conferenceService.createConference(conferenceCreateDto, category, member.getId());

        Conference conference = conferenceRepository.findById(conferenceResponseDto.getConferenceId()).orElseThrow(()->new CustomException(ErrorCode.CONFERENCE_NOT_FOUND));

        assertThat(memberConferenceRepository.findByConferenceAndMember(conference, member).getEnterStatus()).isEqualTo(EnterStatus.ENTER);
        assertThat(conferenceResponseDto.getTitle()).isEqualTo("한국 vs 일본");
        assertThat(conferenceResponseDto.getTotal()).isEqualTo(1);
    }

    @Test
    public void enterConferenceTest(){
        Member member = getMember("Park11");
        memberRepository.save(member);
        Conference conference = Conference.createConference("한국 vs 일본", "축구경기", member, Conference_category.SOCCER);

        conferenceRepository.save(conference);

        Member member1 = getMember("Park22");
        Member member2 = getMember("Park33");
        Member member3 = getMember("Park44");
        Member member4 = getMember("Park55");

        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);
        memberRepository.save(member4);

        ConferenceJoinDto conferenceJoinDto1 = new ConferenceJoinDto(conference.getId());
        ConferenceJoinDto conferenceJoinDto2 = new ConferenceJoinDto(conference.getId());
        ConferenceJoinDto conferenceJoinDto3 = new ConferenceJoinDto(conference.getId());
        ConferenceJoinDto conferenceJoinDto4 = new ConferenceJoinDto(conference.getId());

        conferenceService.enterConference(conferenceJoinDto1, member1.getId());
        conferenceService.enterConference(conferenceJoinDto2, member2.getId());
        conferenceService.enterConference(conferenceJoinDto3, member3.getId());
        conferenceService.enterConference(conferenceJoinDto4, member4.getId());

        Member_conference memberConference1 = memberConferenceRepository.findByConferenceAndMember(conference, member1);
        Member_conference memberConference2 = memberConferenceRepository.findByConferenceAndMember(conference, member2);
        Member_conference memberConference3 = memberConferenceRepository.findByConferenceAndMember(conference, member3);
        Member_conference memberConference4 = memberConferenceRepository.findByConferenceAndMember(conference, member4);

        assertThat(memberConference1.getEnterStatus()).isEqualTo(EnterStatus.ENTER);
        assertThat(memberConference2.getEnterStatus()).isEqualTo(EnterStatus.ENTER);
        assertThat(memberConference3.getEnterStatus()).isEqualTo(EnterStatus.ENTER);
        assertThat(memberConference4.getEnterStatus()).isEqualTo(EnterStatus.ENTER);

        assertThat(conference.getTotal()).isEqualTo(4);
    }

    @Test
    public void modifyConferenceTest(){
        Member member = getMember("con1");
        memberRepository.save(member);
        Conference conference1 = Conference.createConference("한국 vs 일본", "123123", member, Conference_category.SOCCER);
        conferenceRepository.save(conference1);

        Conference conference = conferenceRepository.findById(conference1.getId()).get();
        ConferenceModifyDto conferenceModifyDto = new ConferenceModifyDto(conference.getId(), "한국 vs 중국", "예에");
        conference.modifyConference(conferenceModifyDto);

        assertThat(conference.getTitle()).isEqualTo("한국 vs 중국");
        assertThat(conference.getDescription()).isEqualTo("예에");
    }

    @Test
    public void exitConference(){
        Member member = getMember("exitTest");
        memberRepository.save(member);
        Conference conference = Conference.createConference("한국 vs 일본", "exitTest!!", member, Conference_category.SOCCER);
        conferenceRepository.save(conference);

        ConferenceExitDto conferenceExitDto = new ConferenceExitDto(conference.getId());
        conferenceService.exitConference(conferenceExitDto, member.getId());

        assertThat(memberConferenceRepository.findByConferenceAndMember(conference, member).getEnterStatus()).isEqualTo(EnterStatus.EXIT);
        assertThat(conference.getTotal()).isEqualTo(-1);
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