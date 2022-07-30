package com.ssafy.hool.dto.member;

import com.ssafy.hool.domain.Authority;
import com.ssafy.hool.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoinDto {

    private String memberEmail;
    private String password;
    private String name;
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
