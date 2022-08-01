package com.ssafy.hool.repository;

import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.FriendRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query(value = "select * from friend_request where to_member_id = :memberId and friend_request_status = 'PROCESS'", nativeQuery = true)
    List<FriendRequest> findFriendRequest(@Param("memberId") Long memberId);

    @Modifying
    @Query(value = "INSERT INTO friend_request(from_member_id, to_member_id, created_date, last_modified_date" +
            ", friend_request_status)" +
            "VALUES(:fromMember, :toMember, now(), now(), 'PROCESS')", nativeQuery = true)
    void sendFriendMessage(@Param("fromMember") Long fromMember, @Param("toMember") Long toMember);
}
