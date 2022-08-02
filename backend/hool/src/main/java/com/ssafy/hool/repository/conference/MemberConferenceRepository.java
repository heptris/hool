package com.ssafy.hool.repository.conference;

import com.ssafy.hool.domain.conference.Member_conference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberConferenceRepository extends JpaRepository<Member_conference, Long> {
}
