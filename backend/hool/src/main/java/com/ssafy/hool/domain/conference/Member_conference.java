package com.ssafy.hool.domain.conference;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.member.Member;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Setter
@Entity
public class Member_conference extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_conference_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private EnterStatus enterStatus;

    public static Member_conference createMemberConference(Member member, Conference conference) {
        Member_conference memberConference = Member_conference.builder()
                .member(member)
                .conference(conference)
                .enterStatus(EnterStatus.ENTER)
                .build();
        memberConference.addConference(conference);
        memberConference.addMember(member);
        return memberConference;
    }

    public void addConference(Conference conference){
        this.conference = conference;
        conference.getMemberConferenceList().add(this);
    }

    public void addMember(Member member){
        this.member = member;
        member.getMemberConferenceList().add(this);
    }

    public void updateEnterState(EnterStatus enterStatus){
        this.enterStatus = enterStatus;
    }
}
