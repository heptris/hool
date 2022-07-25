package com.ssafy.hool.domain;

import lombok.*;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Emoji extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "emoji_id")
    private Long id;

    private String url;
    private String name;
    private String creator;
    private LocalDateTime created_time;

    @OneToMany(mappedBy = "emoji", cascade = CascadeType.ALL)
    private List<Member_emoji>  memberEmojiList = new ArrayList<>();

    @OneToOne(mappedBy = "emoji", fetch = FetchType.LAZY)
    private Emoji_shop emoji_shop;

}
