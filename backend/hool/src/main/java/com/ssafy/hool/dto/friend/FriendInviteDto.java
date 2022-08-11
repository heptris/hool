package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FriendInviteDto {

    private Long conferenceId;
    private Long friendMemberId;
}
