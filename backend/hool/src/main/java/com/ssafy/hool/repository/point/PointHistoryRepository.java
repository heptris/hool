package com.ssafy.hool.repository.point;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.point_history.PointHistoryListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PointHistoryRepository extends JpaRepository<Point_history, Long> {

    @Query("select new com.ssafy.hool.dto.point_history.PointHistoryListResponseDto(p.description, p.deal_point, p.createdDate) " +
            "from Point_history p where p.member.id = :member_id order by p.createdDate desc ")
    List<PointHistoryListResponseDto> findPointListDto(@Param("member_id") Long member_id);
}
