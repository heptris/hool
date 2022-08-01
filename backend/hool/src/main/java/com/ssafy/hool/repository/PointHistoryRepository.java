package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Conference;
import com.ssafy.hool.domain.Point_history;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<Point_history, Long> {
}
