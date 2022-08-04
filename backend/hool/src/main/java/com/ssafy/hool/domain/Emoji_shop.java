package com.ssafy.hool.domain;

import lombok.*;

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
public class Emoji_shop extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "emoji_store_id")
    private Long id;

    private int emoji_price;

    private LocalDateTime created_time;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "emoji_id")
    private Emoji emoji;

    @OneToMany(mappedBy = "emojiShop", cascade = CascadeType.ALL)
    private List<Deal_history> dealHistoryList = new ArrayList<>();

}
