package com.ssafy.hool.controller.member;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.EmojiDetailRequestDto;
import com.ssafy.hool.dto.emoji.MemberEmojiDto;
import com.ssafy.hool.dto.emoji.MemberEmojiFavoriteReqDto;
import com.ssafy.hool.dto.member.*;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.service.member.MemberService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Api(tags = {"회원프로필과 관련된 Controller"})
@RequestMapping("/api/member")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    private static final int DEFAULT_SIZE = 2;

    @ApiOperation(value = "회원 프로필 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 프로필 수정 완료")
    })
    @PutMapping("/")
    public ResponseEntity memberUpdate(@RequestBody MemberUpdateDto memberUpdateDto) {
        Long memberId = SecurityUtil.getCurrentMemberId();
        memberService.updateMember(memberId, memberUpdateDto.getPassword(), memberUpdateDto.getName(), memberUpdateDto.getNickName());

        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", "회원 수정 완료")
                ,HttpStatus.OK);
    }
    
    @ApiOperation(value = "회원 프로필 조회", notes = "회원 프로필을 반환해줍니다.")
    @GetMapping("/")
    public ResponseEntity memberProfile() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        Member member = memberService.findByMemberId(memberId);
        int friendCount = memberService.getFriendCount(memberId);
        int emojiCount = memberService.getEmojiCount(memberId);
        CursorResult memberEmojiList = memberService.getEmojiList(memberId, null, PageRequest.of(0, DEFAULT_SIZE));
        MemberResponseDto memberProfile = MemberResponseDto.builder()
                .memberId(member.getId())
                .nickName(member.getNickName())
                .memberEmail(member.getMemberEmail())
                .memberProfile(member.getProfileImage())
                .point(member.getPoint())
                .friendCount(friendCount)
                .emojiCount(emojiCount)
                .memberEmojiList(memberEmojiList)
                .build();

        return new ResponseEntity<ResponseDto>(new ResponseDto<MemberResponseDto>(200, "success",
                memberProfile), HttpStatus.OK);
    }

    @ApiOperation(value = "보유중인 이모지", notes = "이모지 url과 이모지 Id 반환")
    @GetMapping("/my/emoji")
    public ResponseEntity<?> getMyEmojis() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "보유중인 이모지", memberService.getEmojis(memberId))
                , HttpStatus.OK);
    }

    @GetMapping("/my/emoji/page")
    public ResponseEntity<?> getMyEmojisPage(Long emojiCursorId, Integer size) {
        if (size == null) size = DEFAULT_SIZE;
        Long memberId = SecurityUtil.getCurrentMemberId();
        CursorResult memberEmojiList = memberService.getEmojiList(memberId, emojiCursorId, PageRequest.of(0, size));
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", memberEmojiList)
                , HttpStatus.OK);
    }


    @ApiOperation(value = "즐겨찾기 이모지", notes = "즐겨찾기 된 이모지 url과 Id 반환")
    @GetMapping("/my/favorite/emoji")
    public ResponseEntity<?> getMyFavoriteEmojis() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "즐겨찾기 이모지", memberService.getFavoriteEmojis(memberId))
                , HttpStatus.OK);
    }

    @GetMapping("/my/favorite/emoji/page")
    public ResponseEntity<?> getMyFavEmojisPage(Long emojiFavCursorId, Integer size) {
        if (size == null) size = DEFAULT_SIZE;
        Long memberId = SecurityUtil.getCurrentMemberId();
        CursorResult memberFavEmojiList = memberService.getFavEmojiList(memberId, emojiFavCursorId, PageRequest.of(0, size));
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", memberFavEmojiList)
                , HttpStatus.OK);
    }

    @ApiOperation(value = "이모지 상세정보")
    @PostMapping("/detail/emoji")
    public ResponseEntity<?> detailEmoji(@RequestBody EmojiDetailRequestDto emojiDetailRequestDto) {
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "상세 이모지",
                memberService.getDetailEmoji(emojiDetailRequestDto.getEmojiId())), HttpStatus.OK);
    }

    @ApiOperation(value = "이모지 즐겨찾기 등록 / 해제")
    @PostMapping("/detail/emoji/favorite")
    public ResponseEntity<?> detailEmojiFavorite(@RequestBody MemberEmojiFavoriteReqDto memberEmojiFavoriteReqDto) {
        Long memberId = SecurityUtil.getCurrentMemberId();
        memberService.memberEmojiFavoriteToggle(memberId, memberEmojiFavoriteReqDto.getEmojiId());
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "즐겨찾기 토글", null), HttpStatus.OK);
    }

}
