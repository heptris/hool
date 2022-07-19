package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
