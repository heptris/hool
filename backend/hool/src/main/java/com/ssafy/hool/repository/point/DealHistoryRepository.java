package com.ssafy.hool.repository.point;

import com.ssafy.hool.domain.point.Deal_history;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealHistoryRepository extends JpaRepository<Deal_history, Long> {
}
