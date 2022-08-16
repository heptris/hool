package com.ssafy.hool.repository.member;

import com.ssafy.hool.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
    @Query(value = "select m from Member m where m.nickName like %:friendNickName%")
    List<Member> findByFriendWithNickName(@Param("friendNickName") String friendNickName);

    Optional<Member> findByMemberEmail(String memberEmail);

    boolean existsByMemberEmail(String memberEmail);

    // 닉네임 중복 체크
    boolean existsByNickName(String nickName);

    @Query("select count(m.id) from Member m join m.friends f where m.id = :memberId")
    int getFriendCount(@Param("memberId") Long memberId);

    @Query("select count(m.id) from Member m join m.emojis e where m.id = :memberId")
    int getEmojiCount(@Param("memberId") Long memberId);

}
