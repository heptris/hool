package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Member extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String name;

    @Column(unique = true)
    private String memberIdName; // 로그인 아이디
    private String password; // 로그인 비밀번호

    @Column(unique = true)
    private String nickName; // 화면 내에서 아이디
    private int point;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Game_history> gameHistoryList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Friend> friends = new ArrayList<>();


    public Member createMember() {
        return null;
    }

    public void enterConference() {

    }

    public void addFriend(Friend friend) {
        this.getFriends().add(friend);
        friend.setMember(this);
    }
}

