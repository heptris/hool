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
public class Conference {

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

    @OneToMany(mappedBy = "conference")
    private List<Member_conference> memberConferenceList = new ArrayList<>();

}
