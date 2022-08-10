package com.ssafy.hool.dto.friend;

import com.ssafy.hool.domain.member.MemberStatus;
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
    // 친구 프로필
    private String friendNickName;
    private Long friendMemberId;
    private String friendEmail;
    private String friendImage;
    private MemberStatus memberStatus;

}
