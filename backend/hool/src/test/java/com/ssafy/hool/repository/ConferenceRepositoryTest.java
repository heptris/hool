package com.ssafy.hool.repository;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.conference.*;
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
@Rollback(value = false)
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

        ConferenceCreateDto conferenceCreateDto1 = new ConferenceCreateDto("Title1", "Description1", "손흥민", "SOCCER");
        ConferenceCreateDto conferenceCreateDto2 = new ConferenceCreateDto("Title2", "Description2", "박지성", "BASEBALL");
        ConferenceCreateDto conferenceCreateDto3 = new ConferenceCreateDto("Title3", "Description3", "김민재", "BASKETBALL");

        conferenceService.createConference(conferenceCreateDto1, Conference_category.SOCCER);
        conferenceService.createConference(conferenceCreateDto2, Conference_category.BASEBALL);
        conferenceService.createConference(conferenceCreateDto3, Conference_category.BASKETBALL);

        List<ConferenceListResponseDto> conferenceList = conferenceRepository.findConferenceListDto();
        assertThat(conferenceList.get(0).getTitle()).isEqualTo("Title1");
        assertThat(conferenceList.get(0).getNickName()).isEqualTo("손흥민");
        assertThat(conferenceList.size()).isEqualTo(3);
    }

    @Test
    public void createConferenceTest(){
        Member member = getMember("Lee");
        memberService.join(member);
        ConferenceCreateDto conferenceCreateDto = new ConferenceCreateDto("한국 vs 일본", "축구경기하고있어요", "Lee", "SOCCER");

        Conference_category category = Enum.valueOf(Conference_category.class, conferenceCreateDto.getConferenceCategory());

        ConferenceResponseDto conferenceResponseDto = conferenceService.createConference(conferenceCreateDto, category);

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

        ConferenceJoinDto conferenceJoinDto1 = new ConferenceJoinDto(conference.getId(), member1.getId());
        ConferenceJoinDto conferenceJoinDto2 = new ConferenceJoinDto(conference.getId(), member2.getId());
        ConferenceJoinDto conferenceJoinDto3 = new ConferenceJoinDto(conference.getId(), member3.getId());
        ConferenceJoinDto conferenceJoinDto4 = new ConferenceJoinDto(conference.getId(), member4.getId());

        conferenceService.enterConference(conferenceJoinDto1);
        conferenceService.enterConference(conferenceJoinDto2);
        conferenceService.enterConference(conferenceJoinDto3);
        conferenceService.enterConference(conferenceJoinDto4);

        assertThat(conference.getTotal()).isEqualTo(4);
    }

    @Test
    public void modifyConferenceTest(){
        Member member = getMember("con1");
        Conference conference1 = Conference.createConference("한국 vs 일본", "123123", member, Conference_category.SOCCER);
        conferenceRepository.save(conference1);

        Conference conference = conferenceRepository.findById(conference1.getId()).get();
        ConferenceModifyDto conferenceModifyDto = new ConferenceModifyDto(conference.getId(), "한국 vs 중국", "예에");
        conference.modifyConference(conferenceModifyDto);

        assertThat(conference.getTitle()).isEqualTo("한국 vs 중국");
        assertThat(conference.getDescription()).isEqualTo("예에");
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