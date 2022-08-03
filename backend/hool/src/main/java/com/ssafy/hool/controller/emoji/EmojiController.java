package com.ssafy.hool.controller.emoji;

import com.ssafy.hool.dto.emoji.*;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.emoji.EmojiService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EmojiController {

    private final EmojiService emojiService;

    @ApiOperation(value = "이모지 만들기", notes = "memberId와 이모지 기본 요소를 받아서 이모지, 멤버이모지 생성", response = Map.class)
    @PostMapping("/api/emoji")
    public ResponseEntity createEmoji(@RequestBody EmojiCreateDto emojiCreateDto){
        emojiService.makeEmoji(emojiCreateDto);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 만들기 완료"),
                HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "이모지 수정", notes = "memberId와 emojiId, 수정된 이모지 이름, 설명 받아서 이모지 수정하고 이모지 기본 요소를 반환", response = Map.class)
    @PutMapping("/api/emoji")
    public ResponseEntity updateEmoji(@RequestBody EmojiUpdateDto emojiUpdateDto){
        emojiService.updateEmoji(emojiUpdateDto);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 수정 완료")
                , HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "이모지 삭제", notes = "memberId와 emojiId를 받아서 확인하고 삭제", response = Map.class)
    @DeleteMapping("/api/emoji")
    public ResponseEntity deleteMemberEmoji(@RequestBody EmojiDeleteDto emojiDeleteDto){
        emojiService.deleteEmoji(emojiDeleteDto);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "이모지 삭제 완료")
                , HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "이모지 리스트", notes = "현재 저장되어있는 이모지들을 반환", response = Map.class)
    @GetMapping("/api/emoji/list")
    public ResponseEntity listMemberEmoji(){
        return  new ResponseEntity<ResponseDto>(
                new ResponseDto<List<MemberEmojiDto>>(200,"success", emojiService.listMemberEmoji())
                , HttpStatus.ACCEPTED);
    }

}
