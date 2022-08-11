package com.ssafy.hool.repository.friend;

import com.ssafy.hool.domain.friend.FriendRequest;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("select new com.ssafy.hool.dto.friend.FriendRequestDto(fr.id, m.nickName, m.id, m.memberEmail, m.profileImage, m.memberStatus) " +
            "from FriendRequest fr join fr.fromMember m where fr.friendRequestStatus = 'PROCESS'" +
            "and fr.toMember.id = :memberId")
    List<FriendRequestDto> findFriendRequest(@Param("memberId") Long memberId);

    @Modifying
    @Query(value = "INSERT INTO friend_request(from_member_id, to_member_id, created_date, last_modified_date" +
            ", friend_request_status)" +
            "VALUES(:fromMember, :toMember, now(), now(), 'PROCESS')", nativeQuery = true)
    void sendFriendMessage(@Param("fromMember") Long fromMember, @Param("toMember") Long toMember);

    @Query("select count(fr.id) > 0 from FriendRequest fr where fr.fromMember.id = :fromMember and fr.toMember.id = :toMember" +
            " and fr.friendRequestStatus = 'PROCESS'")
    boolean isAlreadySendFriendAddMessage(@Param("fromMember") Long fromMember, @Param("toMember") Long toMember);
}
