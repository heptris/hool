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
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
public class Emoji extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emoji_id")
    private Long id;

    private String name;
    private String url;
    private String description;
    private Long creatorId;

    @Builder.Default
    @OneToMany(mappedBy = "emoji", cascade = CascadeType.ALL)
    private List<Member_emoji>  memberEmojiList = new ArrayList<>();

    @OneToOne(mappedBy = "emoji", fetch = FetchType.LAZY)
    private Emoji_shop emoji_shop;

    public static Emoji createEmoji(Long creatorId, String name, String url, String description){
        Emoji emoji = Emoji.builder()
                .name(name)
                .url(url)
                .description(description)
                .creatorId(creatorId)
                .build();

        return emoji;
    }

}
