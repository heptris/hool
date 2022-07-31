package com.ssafy.hool.service;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.FriendRequestStatus;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.friend.FriendListDto;
import com.ssafy.hool.repository.FriendRepository;
import com.ssafy.hool.repository.FriendRequestRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final FriendRequestRepository friendRequestRepository;

    /**
     * 친구추가할 친구를 닉네임으로 검색
     */
    @Transactional
    public void searchAddFriend(String friendNickName) {
        Optional.ofNullable(memberRepository.findByNickName(friendNickName)).orElseThrow(
                () -> new IllegalArgumentException("해당 닉네임을 가진 계정은 없습니다."));
        // dto로 변환
    }

    /**
     * 친구요청 메세지 보내기
     */
    @Transactional
    public void addFriendRequest(Member member, String friendNickName) {
        Member friend = memberRepository.findByNickName(friendNickName).get(); // 친구 추가할 친구의 멤버 엔티티
        FriendRequest friendRequest = FriendRequest.createFriendRequest(member, friend.getId());
        friendRequestRepository.save(friendRequest);
    }

    /**
     * 친구 요청 메세지 수락 / 거부
     */
    @Transactional
    public void friendAccept(Long memberId, Long friendRequestId, Boolean accept) {
        FriendRequest friendRequest = friendRequestRepository.findById(friendRequestId).get();
        // 친구 수락 허용
        if (accept) {
            friendRequest.setFriendRequestStatus(FriendRequestStatus.ACCEPT);

            // 친구 요청 받은 애 (나)
            Member receiver = memberRepository.findById(memberId).get();

            // 친구 요청 건 애
            Member sender = memberRepository.findById(friendRequest.getMember().getId()).get();

            Friend friend = Friend.createFriend(receiver, sender.getId(), friendRequest);
            Friend friend1 = Friend.createFriend(sender, receiver.getId(), friendRequest);

            friendRepository.save(friend);
            friendRepository.save(friend1);

        } // 친구 수락 거부
        else {
            friendRequest.setFriendRequestStatus(FriendRequestStatus.REFUSE);
        }
    }

    /**
     * 나한테 온 친구 요청 메세지 조회
     */
    public List<FriendRequest> getFriendRequestMessage(Long memberId) {
        List<FriendRequest> friendRequestMessage = friendRequestRepository.findFriendRequest(memberId);
        return friendRequestMessage;
    }

    /**
     * 친구 리스트 조회
     */
    public List<FriendListDto> friendList(Long memberId) {
        List<FriendListDto> friendList = friendRepository.findFriendList(memberId);
        return friendList;
    }

    /**
     * 친구
     * 삭제
     */
    public void deleteFriend(Long memberId, Long friendMemberId) {
        friendRepository.deleteByMemberIdAndFriendMemberId(memberId, friendMemberId);
        friendRepository.deleteByMemberIdAndFriendMemberId(friendMemberId, memberId);
    }
}
