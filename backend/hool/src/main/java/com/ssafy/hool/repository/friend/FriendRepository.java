package com.ssafy.hool.repository.friend;

import com.ssafy.hool.domain.friend.Friend;
import com.ssafy.hool.dto.friend.FriendDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("select new com.ssafy.hool.dto.friend.FriendDto(m.id, m.memberEmail, m.nickName)" +
            "from Friend f join f.member m where f.friend.id = :memberId")
    List<FriendDto> findFriendList(@Param("memberId") Long memberId);

    @Query(value = "select f.friend_id from friend f where f.friend_member_id = :friendMemberId", nativeQuery = true)
    List<Long> findByFriendMemberId(@Param("friendMemberId") Long friendMemberId);

    @Modifying
    @Query("delete from Friend f where f.member.id = :memberId and f.friend.id = :friendMemberId")
    int deleteFriend(@Param("memberId") Long memberId, @Param("friendMemberId") Long friendMemberId);

    @Modifying
    @Query(value = "INSERT INTO friend (member_id, friend_member_id, friend_request_id)" +
            "VALUES(:fromMember, :toMember, :friendRequestId)", nativeQuery = true)
    void accept(@Param("fromMember") Long fromMember, @Param("toMember") Long toMember, @Param("friendRequestId") Long friendRequestId);

    @Query("select count(f.id) > 0 from Friend f where f.member.id = :memberId and f.friend.id = :friendMemberId")
    boolean isAlreadyFriend(@Param("memberId") Long memberId, @Param("friendMemberId") Long friendMemberId);
}
