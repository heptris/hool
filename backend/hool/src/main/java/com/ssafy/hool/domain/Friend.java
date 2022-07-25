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

    private String friendNickName; // 친구 아이디

    private String friendName; // 친구 이름


    public static Friend createFriend(Member member, String nickName, String friendName) {
        // 이미 친추돼있는지 검증
        Friend friend = Friend.builder()
                .friendNickName(nickName)
                .friendName(friendName)
                .build();

        friend.addMember(member);
        return friend;
    }

    public void addMember(Member member) {
        this.member = member;
        member.getFriends().add(this);
    }
}
