package com.ssafy.hool.repository.point;

import com.ssafy.hool.domain.point.Point_history;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<Point_history, Long> {
}
