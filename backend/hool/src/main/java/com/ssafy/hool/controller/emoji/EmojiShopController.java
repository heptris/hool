package com.ssafy.hool.controller.emoji;

import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
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
public class EmojiShopController {

    private final EmojiService emojiService;

    @ApiOperation(value = "상점이모지 만들기", notes = "이모지 객체와 가격을 받아 이모지상점에 저장", response = Map.class)
    @PostMapping("/api/emoji_shop")
    public ResponseEntity createEmojiShop(@RequestBody EmojiShopDto emojiShopDto){
        emojiService.makeEmojiShop(emojiShopDto);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "상점이모지 만들기 완료"),
                HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "상점이모지 수정",
            notes = "상점이모지 아이디와 memberId와 수정한 가격을 받아 이모지상점에 저장 후 이모지 객체와 가격을 담은 dto로 반환", response = Map.class)
    @PutMapping("/api/emoji_shop")
    public ResponseEntity updateEmojiShop(@RequestBody EmojiShopUpdateDto emojiShopUpdateDto){
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<EmojiShopDto>(200,"success", emojiService.updateEmojiShop(emojiShopUpdateDto))
                , HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "상점이모지 삭제", notes = "이모지 상점 아이디를 받아 해당되는 이모지를 상점에서 삭제", response = Map.class)
    @DeleteMapping("/api/emoji_shop")
    public ResponseEntity deleteEmojiShop(@RequestParam Long emojiShopId){
        emojiService.deleteEmojiShop(emojiShopId);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "상점이모지 삭제 완료"),
                HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "상점이모지 리스트", notes = "이모지 상점에 저장된 이모지 리스트 반환", response = Map.class)
    @GetMapping("/api/emoji_shop/list")
    public ResponseEntity listEmojiShop(){
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<List<EmojiShopDto>>(200,"success",emojiService.listEmojiShop())
                , HttpStatus.ACCEPTED);
    }

}
