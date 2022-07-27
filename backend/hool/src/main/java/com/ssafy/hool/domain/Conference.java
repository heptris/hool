package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Conference extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "conference_id")
    private Long id;

    private Long owner_id;
    private Boolean is_active;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Conference_category conference_category;

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Game> games = new ArrayList<>();

    public static Conference createConference(String title, Member owner, Conference_category conference_category) {
        Conference conference = Conference.builder()
                .title(title)
                .owner_id(owner.getId())
                .is_active(true)
                .conference_category(conference_category)
                .build();

        Member_conference memberConference = Member_conference.builder()
                .member(owner)
                .build();

        conference.addMemberConference(memberConference);

        return conference;
    }

    public void addMemberConference(Member_conference memberConference) {
        this.memberConferenceList.add(memberConference);
        memberConference.setConference(this);
    }


}
