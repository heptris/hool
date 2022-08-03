package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FriendAcceptDto {

    private Long FriendRequestId;
    private Boolean accept;
}
