package com.ssafy.hool.domain.conference;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.game.Game;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.conference.ConferenceModifyDto;
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
public class Conference extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conference_id")
    private Long id;

    private Long owner_id;
    private Boolean is_active;
    private String title;
    private String description;
    private int total;

    @Enumerated(EnumType.STRING)
    private Conference_category conference_category;

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Game> games = new ArrayList<>();

    public static Conference createConference(String title, String description, Member owner, Conference_category conference_category) {
        Conference conference = Conference.builder()
                .title(title)
                .description(description)
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

    public void modifyConference(ConferenceModifyDto conferenceModifyDto){
        this.title = conferenceModifyDto.getTitle();
        this.description = conferenceModifyDto.getDescription();
    }

    public void totalUpdate(int value){
        this.total += value;
    }

    public ConferenceListResponseDto toConferenceListResponseDto() {
        return ConferenceListResponseDto.builder()
                .conferenceId(id)
                .category(conference_category)
                .description(description)
                .title(title)
                .total(total)
                .build();
    }
}
