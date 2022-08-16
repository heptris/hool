package com.ssafy.hool.controller.emoji;

import com.ssafy.hool.dto.conference.ConferenceListResponseDto;
import com.ssafy.hool.dto.emoji.CanEmojiDto;
import com.ssafy.hool.dto.emoji.EmojiDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopListDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopRankingDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.emoji.EmojiService;
import com.ssafy.hool.service.emoji.EmojiShopRankingService;
import com.ssafy.hool.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emojishop")
public class EmojiShopController {

    private static final int Default_SIZE = 2;
    private final EmojiService emojiService;
    private final EmojiShopRankingService emojiShopRankingService;

    @ApiOperation(value = "상점이모지 만들기", notes = "이모지 객체와 가격을 받아 이모지상점에 저장", response = Map.class)
    @PostMapping("/")
    public ResponseEntity createEmojiShop(@RequestBody EmojiShopDto emojiShopDto){
        emojiService.makeEmojiShop(emojiShopDto);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "상점이모지 만들기 완료"),
                HttpStatus.OK);
    }

    @ApiOperation(value = "상점에 이모지 등록시 나오는 리스트",
            notes = "login한 사용자의 상점에 등록 가능한 이모지 리스트를 보여준다. " +
                    "login한 회원의 멤버이모지 중 직접 만들었고 이모지 상점에 등록하지 않은 이모지들을 리스트로 보여준다."
            , response = Map.class)
    @GetMapping("/makelist")
    public ResponseEntity createEmojiShopList(){
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<List<EmojiDto>>(200,"success", emojiService.listCanEmojiShop(memberId))
                , HttpStatus.OK);
    }

    @ApiOperation(value = "페이징 된 상점에 이모지 등록시 나오는 리스트",
            notes = "login한 사용자의 상점에 등록 가능한 이모지 리스트를 보여준다. " +
                    "login한 회원의 멤버이모지 중 직접 만들었고 이모지 상점에 등록하지 않은 이모지들을 리스트로 보여준다."
            , response = Map.class)
    @GetMapping("/makelist/page")
    public ResponseEntity canEmojiShopList(Long cursorId, Integer size){
        Long memberId = SecurityUtil.getCurrentMemberId();
        if(size == null) size = Default_SIZE;
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200,"success",
                        emojiService.getCanEmojiShopList(memberId, cursorId, PageRequest.of(0, size))), HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 수정",
            notes = "상점이모지 아이디와 memberId와 수정한 가격을 받아 이모지상점에 저장 후 이모지 객체와 가격을 담은 dto로 반환", response = Map.class)
    @PutMapping("/")
    public ResponseEntity updateEmojiShop(@RequestBody EmojiShopUpdateDto emojiShopUpdateDto){
        Long memberId = SecurityUtil.getCurrentMemberId();
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<EmojiShopDto>(200,"success", emojiService.updateEmojiShop(emojiShopUpdateDto, memberId))
                , HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 삭제", notes = "이모지 상점 아이디를 받아 해당되는 이모지를 상점에서 삭제", response = Map.class)
    @DeleteMapping("/")
    public ResponseEntity deleteEmojiShop(@RequestParam Long emojiShopId){
        emojiService.deleteEmojiShop(emojiShopId);
        return new ResponseEntity<ResponseDto>(
                new ResponseDto(200, "success", "상점이모지 삭제 완료"),
                HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 리스트", notes = "이모지 상점에 저장된 이모지 리스트 반환", response = Map.class)
    @GetMapping("/list")
    public ResponseEntity listEmojiShop(){
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<List<EmojiShopDto>>(200,"success",emojiService.listEmojiShop())
                , HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 페이징 리스트", notes = "이모지 상점에 저장된 이모지 리스트를 페이징하여 반환", response = Map.class)
    @GetMapping("/list/page")
    public ResponseEntity findEmojiShopByPage(Long cursorId, Integer size) {
        if(size == null) size = Default_SIZE;
        CursorResult<EmojiShopListDto> emojiShopListDtoCursorResult = emojiService.get(cursorId, PageRequest.of(0, size));
        return new ResponseEntity(new ResponseDto(200, "success", emojiShopListDtoCursorResult)
                , HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 검색", notes = "이모지 상점에 이모지 이름으로 검색하면 검색한 단어가 포함된 이모지 리스트 반환", response = Map.class)
    @GetMapping("/search")
    public ResponseEntity searchEmojiShop(@RequestParam String keyword){
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<List<EmojiShopListDto>>(200,"success",emojiService.searchEmojiShopList(keyword.trim()))
                , HttpStatus.OK);
    }

    @ApiOperation(value = "상점이모지 랭킹리스트", notes = "이모지 상점에 저장된 이모지 리스트를 많이 판매한 순으로 반환", response = Map.class)
    @GetMapping("/list/rank")
    public ResponseEntity listEmojiShopByRank(Integer size){
        if(size == null) size = 10;
        return new ResponseEntity<ResponseDto>(
                new ResponseDto<List<EmojiShopRankingDto>>(200,"success",
                        emojiShopRankingService.getRanking(PageRequest.of(0,size))), HttpStatus.OK);
    }

}
