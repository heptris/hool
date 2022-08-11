package com.ssafy.hool.service.conference;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.domain.conference.EnterStatus;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.conference.Member_conference;
import com.ssafy.hool.domain.member.MemberStatus;
import com.ssafy.hool.dto.conference.*;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.conference.ConferenceRepository;
import com.ssafy.hool.repository.conference.MemberConferenceRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public ConferenceResponseDto createConference(ConferenceCreateDto conferenceCreateDto, Conference_category conference_category, Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Conference conference = Conference.createConference(conferenceCreateDto.getTitle(), conferenceCreateDto.getDescription(), member, conference_category);
        conference.totalUpdate(1);
        conferenceRepository.save(conference);

        Member_conference memberConference = memberConferenceRepository.findByConferenceAndMember(conference, member);
        memberConference.updateEnterState(EnterStatus.ENTER);

        return new ConferenceResponseDto(conference.getId(), conference.getTitle(), conference.getDescription(), conference.getConference_category().name(), conference.getTotal());
    }

    /**
     * 응원방 입장
     * @param conferenceJoinDto
     */
    public void enterConference(ConferenceJoinDto conferenceJoinDto, Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
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

    /**
     * 응원방 나가기
     * @param conferenceExitDto
     */
    public void exitConference(ConferenceExitDto conferenceExitDto, Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Conference conference = conferenceRepository.findById(conferenceExitDto.getConferenceId()).orElseThrow(() -> new CustomException(CONFERENCE_NOT_FOUND));
        conference.totalUpdate(-1);

        Member_conference memberConference = memberConferenceRepository.findByConferenceAndMember(conference, member);
        memberConference.updateEnterState(EnterStatus.EXIT);
    }

    //----------------------------------------------------------------

    public CursorResult<ConferenceListResponseDto> get(Long cursorId, Pageable page) {
        final List<ConferenceListResponseDto> boards = getBoards(cursorId, page);
        final Long lastIdOfList = boards.isEmpty() ?
                null : boards.get(boards.size() - 1).getConferenceId();

        return new CursorResult<>(boards, hasNext(lastIdOfList), lastIdOfList);
    }

    public List<ConferenceListResponseDto> getBoards(Long id, Pageable page) {

        if (id == null) {
            return conferenceRepository.findConferenceListDtoPage(page);
        } else {
            return conferenceRepository.findConferenceListDtoLessPage(id, page);
        }

    }

    public Boolean hasNext(Long id) {
        if (id == null) return false;
        return conferenceRepository.existsByIdLessThan(id);
    }
}
