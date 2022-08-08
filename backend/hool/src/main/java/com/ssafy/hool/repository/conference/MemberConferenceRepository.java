package com.ssafy.hool.repository.conference;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Member_conference;
import com.ssafy.hool.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberConferenceRepository extends JpaRepository<Member_conference, Long> {

    Member_conference findByConferenceAndMember(Conference conference, Member member);
}
