package com.ssafy.hool.repository.conference;

import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Conference_category;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.id, c.title, c.description, m.nickName, c.conference_category, c.isPublic, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id")
    List<ConferenceListResponseDto> findConferenceListDto();


    List<Conference> findAllByOrderByIdDesc(Pageable page);

    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.id, c.title, c.description, m.nickName, c.conference_category, c.isPublic, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id where c.isActive = true order by c.id desc")
    List<ConferenceListResponseDto> findConferenceListDtoPage(Pageable page);

    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.id, c.title, c.description, m.nickName, c.conference_category, c.isPublic, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id where c.isActive = true and c.conference_category = :category order by c.id desc")
    List<ConferenceListResponseDto> findConferenceSearchListDtoPage(@Param("category") Conference_category category, Pageable page);

    List<Conference> findByIdLessThanOrderByIdDesc(Long id, Pageable page);


    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.id, c.title, c.description, m.nickName, c.conference_category, c.isPublic, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id where c.isActive = true and c.id < :id order by c.id desc")
    List<ConferenceListResponseDto> findConferenceListDtoLessPage(@Param("id") Long id, Pageable page);

    @Query("select new com.ssafy.hool.dto.conference.ConferenceListResponseDto(c.id, c.title, c.description, m.nickName, c.conference_category, c.isPublic, c.total)" +
            "from Conference c join Member m on c.owner_id = m.id where c.isActive = true and c.conference_category = :category and c.id < :id order by c.id desc")
    List<ConferenceListResponseDto> findConferenceSearchListDtoLessPage(@Param("category") Conference_category category, @Param("id") Long id, Pageable page);

    @Query("select count(c.id) > 0 from Conference c where c.isActive = true and c.id < :id")
    Boolean existsByIdLessThan(@Param("id") Long id);

    @Query("select count(c.id) > 0 from Conference c where c.isActive = true and c.conference_category = :category and c.id < :id")
    Boolean existsBySearchIdLessThan(@Param("category") Conference_category category, @Param("id") Long id);
//    Boolean existsByIdLessThan(Long id);
}
