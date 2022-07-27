package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByNickName(String nickName);

    Optional<Member> findByMemberEmail(String memberEmail);

    // 닉네임 중복 체크
    boolean existsByNickName(String nickName);

}
