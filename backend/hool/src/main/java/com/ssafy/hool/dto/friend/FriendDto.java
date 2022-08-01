package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class FriendDto {
    private Long id;
    private String memberEmail;
    private String nickName;
}
