package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class FriendDto {
    private Long friendMemberId;
    private String friendMemberEmail;
    private String friendNickName;
    // 친구 프로필 이미지
}
