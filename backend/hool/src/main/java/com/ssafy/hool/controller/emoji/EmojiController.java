package com.ssafy.hool.controller.emoji;

import com.ssafy.hool.dto.emoji.*;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.emoji.EmojiService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emoji")
public class EmojiController {

    private final EmojiService emojiService;

    @ApiOperation(value = "이모지 만들기", notes = "memberId와 이모지 기본 요소를 받아서 이모지, 멤버이모지 생성", response = Map.class)
    @PostMapping(path = "/")
    public ResponseEntity createEmoji(@RequestPart EmojiCreateDto emojiCreateDto, @RequestPart("file") MultipartFile multipartFile){
        Long memberId = SecurityUtil.getCurrentMemberId();
        emojiService.makeEmoji(multipartFile, emojiCreateDto, memberId);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 만들기 완료"),
                HttpStatus.ACCEPTED);
    }

//    @ApiOperation(value = "이모지 만들기", notes = "memberId와 이모지 기본 요소를 받아서 이모지, 멤버이모지 생성", response = Map.class)
//    @PostMapping(path = "/", consumes = {"multipart/form-data"})
//    public ResponseEntity createEmoji(@ModelAttribute EmojiS3Dto emojiS3Dto){
//        Long memberId = SecurityUtil.getCurrentMemberId();
//        emojiService.makeEmoji(emojiS3Dto, memberId);
//        return new ResponseEntity<ResponseDto>(
//                new ResponseDto(200, "success", "이모지 만들기 완료"),
//                HttpStatus.ACCEPTED);
//    }

    @ApiOperation(value = "이모지 수정",
            notes = "memberId와 emojiId, 수정된 이모지 이름, 설명 받아서 이모지 수정하고 이모지 기본 요소를 반환 " +
                    "이모지를 만든 사람만 수정이 가능", response = Map.class)
    @PutMapping("/")
    public ResponseEntity updateEmoji(@RequestBody EmojiUpdateDto emojiUpdateDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        emojiService.updateEmoji(emojiUpdateDto, memberId);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 수정 완료")
                , HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "이모지 삭제", notes = "memberId와 emojiId를 받아서 확인하고 삭제", response = Map.class)
    @DeleteMapping("/")
    public ResponseEntity deleteMemberEmoji(@RequestBody EmojiDeleteDto emojiDeleteDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        emojiService.deleteEmoji(emojiDeleteDto, memberId);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 삭제 완료")
                , HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "이모지 리스트", notes = "현재 저장되어있는 이모지들을 반환", response = Map.class)
    @GetMapping("/list")
    public ResponseEntity listMemberEmoji(){
        Long memberId = SecurityUtil.getCurrentMemberId();
        return  new ResponseEntity<ResponseDto>(
                new ResponseDto<List<MemberEmojiDto>>(200,"success", emojiService.listMemberEmoji(memberId))
                , HttpStatus.ACCEPTED);
    }

}
