package com.ssafy.hool.domain.member;

import com.ssafy.hool.domain.*;
import com.ssafy.hool.domain.conference.Conference;
import com.ssafy.hool.domain.conference.Member_conference;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.domain.friend.Friend;
import com.ssafy.hool.domain.friend.FriendRequest;
import com.ssafy.hool.domain.game.Game_history;
import com.ssafy.hool.domain.point.Deal_history;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.dto.member.MemberJoinDto;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(unique = true, nullable = false, length = 50)
    private String memberEmail; // 로그인 이메일

    @Column(nullable = false, length = 100)
    private String password; // 로그인 비밀번호

    @Column(unique = true, nullable = false, length = 30)
    private String nickName; // 화면 내에서 아이디

    private int point;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Authority authority;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private MemberStatus memberStatus;

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
    @OneToMany(mappedBy = "fromMember", cascade = CascadeType.ALL)
    private List<FriendRequest> friendRequestList = new ArrayList<>();

    public static Member createMember(MemberJoinDto memberCreateDto) {
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

    public FriendDto friendDto() {
        FriendDto friend = FriendDto.builder()
                .friendMemberEmail(memberEmail)
                .friendNickName(nickName)
                .friendMemberId(id)
                .friendProfile(profileImage)
                .build();

        return friend;
    }

    public void updateMemberStatus(MemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}

