package com.ssafy.hool.service.friend;

import com.ssafy.hool.domain.friend.FriendRequest;
import com.ssafy.hool.domain.friend.FriendRequestStatus;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.friend.FriendRepository;
import com.ssafy.hool.repository.friend.FriendRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.ALREADY_SAVED_FRIEND;
import static com.ssafy.hool.exception.ex.ErrorCode.ALREADY_SEND_FRIEND_ADD_MESSAGE;

@RequiredArgsConstructor
@Transactional
@Service
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendRepository friendRepository;

    /**
     * 친구요청 메세지 보내기
     */
    @Transactional
    public void sendFriendMessage(Long fromMember, Long toMember) {
        if (friendRepository.isAlreadyFriend(fromMember, toMember)) {
            throw new CustomException(ALREADY_SAVED_FRIEND);
        }
        if (friendRequestRepository.isAlreadySendFriendAddMessage(fromMember, toMember)) {
            throw new CustomException(ALREADY_SEND_FRIEND_ADD_MESSAGE);
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
    public List<FriendRequestDto> getFriendRequestMessage(Long memberId) {
        List<FriendRequestDto> friendRequestDtos = friendRequestRepository.findFriendRequest(memberId);
        return friendRequestDtos;
    }

    /**
     * 나한테 온 친구 요청 메세지 조회 (페이징)
     */
    public CursorResult<FriendRequestDto> get(Long memberId, Long friendRequestCursorId, Pageable page) {
        final List<FriendRequestDto> friendRequests = getFriendRequests(memberId, friendRequestCursorId, page);
        final Long lastIdOfList = friendRequests.isEmpty() ?
                null : friendRequests.get(friendRequests.size() - 1).getFriendRequestId();

        return new CursorResult(friendRequests, hasNext(memberId, lastIdOfList), lastIdOfList);
    }

    public List<FriendRequestDto> getFriendRequests(Long memberId, Long friendRequestCursorId, Pageable page) {

        if (friendRequestCursorId == null) {
            return friendRequestRepository.findFriendRequestDtoPage(memberId, page);
        } else {
            return friendRequestRepository.findFriendRequestDtoLessPage(memberId, friendRequestCursorId, page);
        }

    }

    public Boolean hasNext(Long memberId, Long friendRequestCursorId) {
        if (friendRequestCursorId == null) return false;
        return friendRequestRepository.existsByFriendRequestIdLessThan(memberId, friendRequestCursorId);
    }

}
