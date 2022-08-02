package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.title, c.description, m.nickName, c.conference_category, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id")
    List<ConferenceListResponseDto> findConferenceListDto();
}
