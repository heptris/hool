package com.ssafy.hool.domain;

import com.ssafy.hool.dto.member.MemberCreateDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Member extends BaseEntity {

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

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Game_history> gameHistoryList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Friend> friends = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Member_emoji> emojis = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Deal_history> dealHistoryList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Point_history> pointHistoryList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FriendRequest> friendRequestList = new ArrayList<>();

    public static Member createMember(MemberCreateDto memberCreateDto) {
        Member member = Member.builder()
                .name(memberCreateDto.getName())
                .memberEmail(memberCreateDto.getMemberEmail())
                .build();
        return member;
    }

    public void enterConference(Conference conference) {
        Member_conference memberConference = Member_conference.builder()
                .member(this)
                .build();
        memberConferenceList.add(memberConference);
        memberConference.setConference(conference);
    }

    // 친구 삭제
    public void deleteFriend(Friend friend) {
        getFriends().remove(friend);
    }
}

