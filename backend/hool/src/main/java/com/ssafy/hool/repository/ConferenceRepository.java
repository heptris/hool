package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Conference_category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {

//    List<Conference> findByConference_category(String conference_category);
}
