package com.ssafy.hool.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberUpdateDto {

    private String password;
    private String name;
    private String nickName;

//    private MultipartFile multipartFile;
}
