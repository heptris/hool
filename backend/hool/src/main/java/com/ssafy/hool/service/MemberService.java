package com.ssafy.hool.service;

import com.ssafy.hool.domain.Member;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    public Optional<Member> findByMemberEmail(String email) {
        return memberRepository.findByMemberEmail(email);
    }

    public boolean existsByNickName(String nickName) {
        return memberRepository.existsByNickName(nickName);
    }

    public Member findByMemberId(Long memberId) {
        return memberRepository.findById(memberId).get();
    }


    @Transactional
    public void updateMember(Long memberId, String password, String name, String nickName) {
        Member member = memberRepository.findById(memberId).get();
        member.setPassword(password);
        member.setName(name);
        member.setNickName(nickName);
    }
}
