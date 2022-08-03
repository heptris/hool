package com.ssafy.hool.dto.friend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SendFriendMessageReqDto {
    private Long friendMemberId;
}
