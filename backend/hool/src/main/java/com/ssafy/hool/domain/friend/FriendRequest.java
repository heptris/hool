package com.ssafy.hool.domain.friend;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.member.Member;
import lombok.*;

import javax.persistence.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Entity
public class FriendRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_request_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    @Enumerated(EnumType.STRING)
    private FriendRequestStatus friendRequestStatus;

//    public static FriendRequest createFriendRequest(Member member, Long friendMemberId) {
//        FriendRequest friendRequest = FriendRequest.builder()
//                .friendMemberId(friendMemberId)
//                .friendRequestStatus(FriendRequestStatus.PROCESS)
//                .build();
//        friendRequest.addMember(member);
//        return friendRequest;
//    }
//
//    public void addMember(Member member) {
//        this.member = member;
//        member.getFriendRequestList().add(this);
//    }

}
