package com.ssafy.hool.domain.conference;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.game.Game;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.conference.ConferenceCreateDto;
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
    private Boolean isActive;
    private String title;
    private String description;
    private int total;
    private Boolean isPublic;
    private String conferencePassword;

    @Enumerated(EnumType.STRING)
    private Conference_category conference_category;

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Member_conference> memberConferenceList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<Game> games = new ArrayList<>();

    public static Conference createConference(ConferenceCreateDto conferenceCreateDto, Member owner, Conference_category conference_category) {
        Conference conference = Conference.builder()
                .title(conferenceCreateDto.getTitle())
                .description(conferenceCreateDto.getDescription())
                .owner_id(owner.getId())
                .isActive(true)
                .isPublic(conferenceCreateDto.getIsPublic())
                .conferencePassword(conferenceCreateDto.getConferencePassword())
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

    public void roomTerminated(){
        this.isActive = false;
    }

    public void changeOwner(Long memberId){
        this.owner_id = memberId;
    }
}
