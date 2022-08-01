package com.ssafy.hool.controller;

import com.ssafy.hool.domain.Emoji;
import com.ssafy.hool.dto.emoji.EmojiCreateDto;
import com.ssafy.hool.service.EmojiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmojiController {

    private final EmojiService emojiService;

//    @PostMapping("/api/emoji")
//    public ResponseEntity<>

    @GetMapping("/api/emoji/list")
    public ResponseEntity<List<EmojiCreateDto>> listEmoji(){
        List<Emoji> emojis = emojiService.listEmoji();
        List<EmojiCreateDto> list = new ArrayList<>();
        for (Emoji emoji : emojis){
            list.add(new EmojiCreateDto(emoji.getName(), emoji.getUrl(), emoji.getDescription(), emoji.getCreatorId()));
        }
        return  new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
