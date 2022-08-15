package com.ssafy.hool.repository.conference;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Member_conference;
import com.ssafy.hool.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberConferenceRepository extends JpaRepository<Member_conference, Long> {

    Member_conference findByConferenceAndMember(Conference conference, Member member);

    List<Member_conference> findAllByOrderByLastModifiedDate();

    @Query("select mc from Member_conference mc where mc.enterStatus = 'ENTER' and mc.member.id = :memberId")
    List<Member_conference> findEnterStatus(@Param("memberId") Long memberId);
}
