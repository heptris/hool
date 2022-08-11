package com.ssafy.hool.service.friend;

import com.ssafy.hool.domain.friend.FriendRequest;
import com.ssafy.hool.domain.friend.FriendRequestStatus;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.member.MemberStatus;
import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.friend.FriendConferenceDto;
import com.ssafy.hool.dto.friend.FriendDto;
import com.ssafy.hool.dto.friend.FriendRequestDto;
import com.ssafy.hool.dto.response.CursorFriendListResult;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.friend.FriendRepository;
import com.ssafy.hool.repository.friend.FriendRequestRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    public FriendDto searchAddFriend(String friendNickName) {
        Member friend = memberRepository.findByNickName(friendNickName).orElseThrow(
                () -> new CustomException(MEMBER_NICKNAME_NOT_FOUND));

        // dto로 변환
        FriendDto friendDto = friend.friendDto();
        return friendDto;
    }

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
     * 친구 리스트 조회
     */
    public List<FriendDto> friendList(Long memberId) {
        List<FriendDto> friendList = friendRepository.findFriendList(memberId);
        for (FriendDto friendDto : friendList) {
            if (friendDto.getMemberStatus() == MemberStatus.ONLINE) {
                FriendConferenceDto friendConference = friendRepository.findFriendConference(friendDto.getFriendMemberId());
                friendDto.setFriendConferenceDto(friendConference);
            }
        }
        return friendList;
    }

    /**
     * 친구 리스트 조회(페이징)
     */
    public CursorFriendListResult<FriendDto> friendListResult(Long memberId, String friendListCursor, Pageable page) {
        final List<FriendDto> friendList = getFriendList(memberId, friendListCursor, page);
        final LocalDateTime lastIdOfList = friendList.isEmpty() ?
                null : friendList.get(friendList.size() - 1).getLast();

        return new CursorFriendListResult(friendList, hasFriendListNext(lastIdOfList), lastIdOfList);
    }

    public List<FriendDto> getFriendList(Long memberId, String friendListCursor, Pageable page) {
        if (friendListCursor == null || !StringUtils.hasText(friendListCursor)) {
            List<FriendDto> friendList =  friendRepository.friendListPage(memberId, page);
            for (FriendDto friendDto : friendList) {
                if (friendDto.getMemberStatus() == MemberStatus.ONLINE) {
                    FriendConferenceDto friendConference = friendRepository.findFriendConference(friendDto.getFriendMemberId());
                    friendDto.setFriendConferenceDto(friendConference);
                }
            }
            return friendList;
        } else {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(friendListCursor, formatter);
            List<FriendDto> friendList = friendRepository.findListPageLessThan(memberId, dateTime, page);
            for (FriendDto friendDto : friendList) {
                if (friendDto.getMemberStatus() == MemberStatus.ONLINE) {
                    FriendConferenceDto friendConference = friendRepository.findFriendConference(friendDto.getFriendMemberId());
                    friendDto.setFriendConferenceDto(friendConference);
                }
            }
            return friendList;
        }

    }

    public Boolean hasFriendListNext(LocalDateTime friendListCursor) {
        if (friendListCursor == null) return false;
        return friendRepository.existsByIdLessThan(friendListCursor);
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
