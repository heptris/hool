package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<Point_history, Long> {
}
