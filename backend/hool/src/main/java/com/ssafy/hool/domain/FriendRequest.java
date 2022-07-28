package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Entity
public class FriendRequest extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "friend_request_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private Long friendMemberId;

    @Enumerated(EnumType.STRING)
    private FriendRequestStatus friendRequestStatus;

    public static FriendRequest createFriendRequest(Member member, Long friendMemberId) {
        FriendRequest friendRequest = FriendRequest.builder()
                .friendMemberId(friendMemberId)
                .friendRequestStatus(FriendRequestStatus.PROCESS)
                .build();
        friendRequest.addMember(member);
        return friendRequest;
    }

    public void addMember(Member member) {
        this.member = member;
        member.getFriendRequestList().add(this);
    }

}
