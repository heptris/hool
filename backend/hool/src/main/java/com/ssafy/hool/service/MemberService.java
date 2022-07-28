package com.ssafy.hool.service;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.FriendRequestStatus;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.repository.FriendRepository;
import com.ssafy.hool.repository.FriendRequestRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FriendRepository friendRepository;

    // 회원 가입
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


    // 회원 수정
    @Transactional
    public void updateMember(Long memberId, String password, String name, String nickName) {
        Member member = memberRepository.findById(memberId).get();
        member.setPassword(password);
        member.setName(name);
        member.setNickName(nickName);
    }

    // 회원 삭제
    @Transactional
    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
        List<Long> deleteFriendIds = friendRepository.findByFriendMemberId(memberId);
        friendRepository.deleteAllByIdInBatch(deleteFriendIds);
    }

    public int getFriendCount(Long memberId) {
        return memberRepository.getFriendCount(memberId);
    }

    public int getEmojiCount(Long memberId) {
        return memberRepository.getEmojiCount(memberId);
    }

}
