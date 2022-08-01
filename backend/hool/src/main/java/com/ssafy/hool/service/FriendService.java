package com.ssafy.hool.service;

import com.ssafy.hool.domain.Friend;
import com.ssafy.hool.domain.FriendRequest;
import com.ssafy.hool.domain.FriendRequestStatus;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.exception.ex.ErrorCode;
import com.ssafy.hool.repository.FriendRepository;
import com.ssafy.hool.repository.FriendRequestRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

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
    public void searchAddFriend(Long memberId, String friendNickName) {
        Member friend = memberRepository.findByNickName(friendNickName).orElseThrow(
                () -> new CustomException(MEMBER_NICKNAME_NOT_FOUND));

        // dto로 변환
        FriendDto friendDto = friend.friendDto();
    }

    /**
     * 친구요청 메세지 보내기
     */
    @Transactional
    public void sendFriendMessage(Long fromMember, Long toMember) {
        if (friendRepository.isAlreadyFriend(fromMember, toMember)) {
            throw new CustomException(ALREADY_SAVED_FRIEND);
        }
        friendRequestRepository.sendFriendMessage(fromMember, toMember);
    }

    /**
     * 친구 요청 메세지 수락 / 거부
     */
    @Transactional
    public void friendAccept(Long friendRequestId, Boolean accept) {
        FriendRequest friendRequest = friendRequestRepository.findById(friendRequestId).get();
        try {
            // 친구 수락 허용
            if (accept) {
                friendRequest.setFriendRequestStatus(FriendRequestStatus.ACCEPT);
                friendRepository.accept(friendRequest.getFromMember().getId(), friendRequest.getToMember().getId(), friendRequestId);
                friendRepository.accept(friendRequest.getToMember().getId(), friendRequest.getFromMember().getId(), friendRequestId);


            } // 친구 수락 거부
            else {
                friendRequest.setFriendRequestStatus(FriendRequestStatus.REFUSE);
            }
        } catch (Exception e) {
            throw new CustomException(ALREADY_SAVED_FRIEND);
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
    public List<FriendDto> friendList(Long memberId) {
        List<FriendDto> friendList = friendRepository.findFriendList(memberId);
        return friendList;
    }

    /**
     * 친구
     * 삭제
     */
    public void deleteFriend(Long memberId, Long friendMemberId) {
        friendRepository.deleteFriend(memberId, friendMemberId);
        friendRepository.deleteFriend(friendMemberId, memberId);
    }
}
