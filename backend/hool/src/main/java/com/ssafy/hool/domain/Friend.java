package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Friend {

    @Id
    @GeneratedValue
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Long friendMemberId;

    @ManyToOne
    @JoinColumn(name = "friend_request_id")
    private FriendRequest friendRequest;


    public static Friend createFriend(Member member, Long friendMemberId, FriendRequest friendRequest) {
        Friend friend = Friend.builder()
                .friendRequest(friendRequest)
                .friendMemberId(friendMemberId)
                .build();

        friend.addMember(member);
        return friend;
    }

    public void addMember(Member member) {
        this.member = member;
        member.getFriends().add(this);
    }
}
