package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FriendRequestDto {

    private Long friendRequestId;
    private String friendNickName;
    private Long friendMemberId;
    // 친구 프로필
}
