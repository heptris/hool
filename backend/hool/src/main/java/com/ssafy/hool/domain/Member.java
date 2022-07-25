package com.ssafy.hool.domain;

import com.ssafy.hool.dto.MemberCreateDto;
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
    private String memberEmail; // 로그인 이메일
    private String password; // 로그인 비밀번호

    @Column(unique = true)
    private String nickName; // 화면 내에서 아이디
    private int point;

    private String profileImage;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Game_history> gameHistoryList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Friend> friends = new ArrayList<>();

    public static Member createMember(MemberCreateDto memberCreateDto) {
        Member member = Member.builder()
                .name(memberCreateDto.getName())
                .memberEmail(memberCreateDto.getMemberIdName())
                .password(memberCreateDto.getPassword())
                .friends(new ArrayList<>())
                .memberConferenceList(new ArrayList<>())
                .gameHistoryList(new ArrayList<>())
                .build();
        return member;
    }

    public void enterConference() {

    }


    // 수정 필요
    public void addFriend(Friend friend) {
        this.getFriends().add(friend);
        friend.setMember(this);
    }
}

