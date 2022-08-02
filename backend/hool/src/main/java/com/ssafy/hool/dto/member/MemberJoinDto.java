package com.ssafy.hool.dto.member;

import com.ssafy.hool.domain.member.Authority;
import com.ssafy.hool.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoinDto {

    @NotBlank
    private String memberEmail;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String nickName;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(memberEmail)
                .password(passwordEncoder.encode(password))
                .authority(Authority.ROLE_USER)
                .name(name)
                .nickName(nickName)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(memberEmail, password);
    }

}
