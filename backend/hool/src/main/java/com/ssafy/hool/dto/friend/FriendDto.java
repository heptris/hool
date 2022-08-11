package com.ssafy.hool.dto.friend;

import com.ssafy.hool.domain.member.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FriendDto {
    private Long friendMemberId;
    private String friendMemberEmail;
    private String friendNickName;

    private LocalDateTime last;
    // 친구 프로필 이미지
    // 친구의 현재 응원방
    private MemberStatus memberStatus;
    private FriendConferenceDto friendConferenceDto;

    public FriendDto(Long friendMemberId, String friendMemberEmail, String friendNickName, LocalDateTime last, MemberStatus memberStatus) {
        this.friendMemberId = friendMemberId;
        this.friendMemberEmail = friendMemberEmail;
        this.friendNickName = friendNickName;
        this.last = last;
        this.memberStatus = memberStatus;
    }
}
