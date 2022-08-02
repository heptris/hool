package com.ssafy.hool.service;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.domain.Member_conference;
import com.ssafy.hool.dto.conference.*;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.ConferenceRepository;
import com.ssafy.hool.repository.MemberConferenceRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.hool.exception.ex.ErrorCode.CONFERENCE_NOT_FOUND;
import static com.ssafy.hool.exception.ex.ErrorCode.MEMBER_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final MemberRepository memberRepository;
    private final MemberConferenceRepository memberConferenceRepository;

    /**
     * 응원방 리스트 - 메인화면
     */
    public List<ConferenceListResponseDto> findAllConference(){
        return conferenceRepository.findConferenceListDto();
    }

    /**
     * 응원방 생성
     * @param conferenceCreateDto
     * @param conference_category
     */
    public ConferenceResponseDto createConference(ConferenceCreateDto conferenceCreateDto, Conference_category conference_category){
        Member member = memberRepository.findByNickName(conferenceCreateDto.getNickName()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Conference conference = Conference.createConference(conferenceCreateDto.getTitle(), conferenceCreateDto.getDescription(), member, conference_category);
        conference.totalUpdate(1);
        conferenceRepository.save(conference);

        return new ConferenceResponseDto(conference.getTitle(), conference.getDescription(), conference.getConference_category().name(), conference.getTotal());
    }

    /**
     * 응원방 입장
     * @param conferenceJoinDto
     */
    public void enterConference(ConferenceJoinDto conferenceJoinDto){
        Member member = memberRepository.findById(conferenceJoinDto.getMemberId()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Conference conference = conferenceRepository.findById(conferenceJoinDto.getConferenceId()).orElseThrow(() -> new CustomException(CONFERENCE_NOT_FOUND));
        conference.totalUpdate(1);
        Member_conference memberConference = Member_conference.createMemberConference(member, conference);
        memberConferenceRepository.save(memberConference);
    }

    /**
     * 응원방 수정
     * @param conferenceModifyDto
     */
    public ConferenceModifyResponseDto modifyConference(ConferenceModifyDto conferenceModifyDto){
        Conference conference = conferenceRepository.findById(conferenceModifyDto.getConferenceId()).orElseThrow(() -> new CustomException(CONFERENCE_NOT_FOUND));
        conference.modifyConference(conferenceModifyDto);
        return new ConferenceModifyResponseDto(conference.getTitle(), conference.getDescription());
    }
}
