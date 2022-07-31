package com.ssafy.hool.repository;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.dto.friend.FriendDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("select new com.ssafy.hool.dto.friend.FriendDto(m.id, m.memberEmail, m.nickName)" +
            "from Friend f join f.member m where f.friendMemberId = :memberId")
    List<FriendDto> findFriendList(@Param("memberId") Long memberId);

    @Query(value = "select f.friend_id from Friend f where f.friend_member_id = :friendMemberId", nativeQuery = true)
    List<Long> findByFriendMemberId(@Param("friendMemberId") Long friendMemberId);

    int deleteByMemberIdAndFriendMemberId(Long memberId, Long friendMemberId);
}
