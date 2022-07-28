package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByNickName(String nickName);

    Optional<Member> findByMemberEmail(String memberEmail);

    // 닉네임 중복 체크
    boolean existsByNickName(String nickName);

    @Query("select count(m.id) from Member m join m.friends f where m.id = :memberId")
    int getFriendCount(@Param("memberId") Long memberId);

    @Query("select count(m.id) from Member m join m.emojis e where m.id = :memberId")
    int getEmojiCount(@Param("memberId") Long memberId);

}
