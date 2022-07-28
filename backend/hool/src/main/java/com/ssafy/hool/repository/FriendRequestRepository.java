package com.ssafy.hool.repository;

import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.FriendRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query(value = "select * from friend_request where friend_member_id = ? and friend_request_status = 'PROCESS'", nativeQuery = true)
    List<FriendRequest> findFriendRequest(Long memberId);
}
