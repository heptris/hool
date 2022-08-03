package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Deal_history;
import com.ssafy.hool.domain.Point_history;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealHistoryRepository extends JpaRepository<Deal_history, Long> {
}
