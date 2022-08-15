package com.ssafy.hool.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberUpdateDto {

    @NotBlank
    @Size(min = 3, max = 30, message = "닉네임은 3~30자리수여야 합니다.")
    private String nickName;

}
