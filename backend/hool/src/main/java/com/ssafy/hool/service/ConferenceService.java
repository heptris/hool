package com.ssafy.hool.service;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.domain.Member_conference;
import com.ssafy.hool.dto.conference.ConferenceCreateDto;
import com.ssafy.hool.dto.conference.ConferenceJoinDto;
import com.ssafy.hool.dto.conference.ConferenceModifyDto;
import com.ssafy.hool.repository.ConferenceRepository;
import com.ssafy.hool.repository.MemberConferenceRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final MemberRepository memberRepository;
    private final MemberConferenceRepository memberConferenceRepository;

    public List<Conference> findAllConference(){
        return conferenceRepository.findAll();
    }

    public void createConference(ConferenceCreateDto conferenceCreateDto, Conference_category conference_category){
        Member member = memberRepository.findByNickName(conferenceCreateDto.getNickName());
        Conference conference = Conference.createConference(conferenceCreateDto.getTitle(), conferenceCreateDto.getDescription(), member, conference_category);
        conferenceRepository.save(conference);
    }

    public void enterConference(ConferenceJoinDto conferenceJoinDto){
        Optional<Member> member = memberRepository.findById(conferenceJoinDto.getMemberId());
        Optional<Conference> conference = conferenceRepository.findById(conferenceJoinDto.getConferenceId());

        Member_conference memberConference = Member_conference.createMemberConference(member.get(), conference.get());
        memberConferenceRepository.save(memberConference);
    }

    public void modifyConference(ConferenceModifyDto conferenceModifyDto){
        Optional<Conference> conference = conferenceRepository.findById(conferenceModifyDto.getConferenceId());
        conference.get().modifyConference(conferenceModifyDto);
    }
}
