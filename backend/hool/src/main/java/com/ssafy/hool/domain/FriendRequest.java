package com.ssafy.hool.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Entity
public class FriendRequest {

    @Id
    @GeneratedValue
    @Column(name = "friend")
    private Long id;
}
