package com.ssafy.hool.controller.member;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.MemberEmojiDto;
import com.ssafy.hool.dto.member.*;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.service.member.MemberService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Api(tags = {"회원프로필, 프로필 수정, 닉네임 중복체크와 관련된 Controller"})
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    /**
     * 닉네임 중복 체크
     */
    @ApiOperation(value = "닉네임 중복 검사", notes = "닉네임 중복 시 에러 발생")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 중복 X"),
            @ApiResponse(code = 409, message = "닉네임 중복")
    })
    @GetMapping("/nickname/check")
    public ResponseDto checkNickNameDuplication(@RequestParam("nickName") String nickName) {
        if (memberService.existsByNickName(nickName) == true) {
            throw new CustomException(ALREADY_USED_NICKNAME);
        } else {
            return new ResponseDto<String>(200, "success", "사용가능한 닉네임입니다.");
        }
    }

    /**
     * 회원 프로필 수정
     */
    @ApiOperation(value = "회원 프로필 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 프로필 수정 완료")
    })
    @PutMapping("/myprofile")
    public ResponseEntity memberUpdate(@RequestBody MemberUpdateDto memberUpdateDto) {
        Long memberId = SecurityUtil.getCurrentMemberId();
        memberService.updateMember(memberId, memberUpdateDto.getPassword(), memberUpdateDto.getName(), memberUpdateDto.getNickName());

        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "success", "회원 수정 완료")
                ,HttpStatus.OK);
    }

    /**
     * 회원 프로필 조회
     */
    @ApiOperation(value = "회원 프로필 조회", notes = "회원 프로필을 반환해줍니다.")
    @GetMapping("/myprofile")
    public ResponseEntity memberProfile() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        Member member = memberService.findByMemberId(memberId);
        int friendCount = memberService.getFriendCount(memberId);
        int emojiCount = memberService.getEmojiCount(memberId);
        List<MemberEmojiDto> memberEmojis = memberService.getEmojis(memberId);
        MemberResponseDto memberProfile = MemberResponseDto.builder()
                .nickName(member.getNickName())
                .memberEmail(member.getMemberEmail())
                .point(member.getPoint())
                .friendCount(friendCount)
                .emojiCount(emojiCount)
                .memberEmojiDtoList(memberEmojis)
                .build();

        return new ResponseEntity<ResponseDto>(new ResponseDto<MemberResponseDto>(200, "success",
                memberProfile), HttpStatus.OK);
    }

    /**
     * 소유중인 이모지 가져 오기
     */
    @GetMapping("/my/emoji")
    public ResponseEntity<?> getMyEmojis() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "보유중인 이모지", memberService.getEmojis(memberId))
                , HttpStatus.OK);
    }

    /**
     * 즐겨찾기 이모지 가져오기
     */
    @GetMapping("/my/favorite/emoji")
    public ResponseEntity<?> getMyFavoriteEmojis() {
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "즐겨찾기 이모지", memberService.getFavoriteEmojis(memberId))
                , HttpStatus.OK);
    }

    @ApiOperation(value = "이모지 상세정보")
    @PostMapping("/detail/emoji")
    public ResponseEntity<?> detailEmoji(Long emojiId) {
        return new ResponseEntity<ResponseDto>(new ResponseDto(200, "상세 이모지",
                memberService.getDetailEmoji(emojiId)), HttpStatus.OK);
    }

//    @ApiOperation(value = "이모지 즐겨찾기 등록 / 해제")

}
