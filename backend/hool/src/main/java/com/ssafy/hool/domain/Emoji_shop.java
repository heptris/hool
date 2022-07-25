package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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



}
