package com.ssafy.hool.service;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.EmojiType;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.EmojiCreateDto;
import com.ssafy.hool.dto.emoji.EmojiDeleteDto;
import com.ssafy.hool.dto.emoji.EmojiUpdateDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.emoji.MemberEmojiRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.emoji.EmojiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class EmojiServiceTest {

    @Autowired
    EmojiService emojiService;
    @Autowired EmojiRepository emojiRepository;
    @Autowired EmojiShopRepository emojiShopRepository;
    @Autowired MemberEmojiRepository memberEmojiRepository;
    @Autowired MemberRepository memberRepository;

    @Test
    public void 이모지만들기() throws Exception{
        // given
        Member member = getMember("1");
        memberRepository.save(member);

        // when
        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");

        emojiService.makeEmoji(emojiCreateDto1);

//         then
        List<Emoji> emojiList = emojiRepository.findAll();
        List<Member_emoji> memberEmojiList = memberEmojiRepository.findAll();
        Emoji emoji = emojiList.get(0);
        Member_emoji memberEmoji = memberEmojiList.get(0);

        assertEquals("1234", emoji.getUrl());
        assertEquals("이모지 설명1",emoji.getDescription());
        assertEquals(EmojiType.MADE, memberEmoji.getEmojitype());
    }

    @Test
    public void 이모지리스트() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        //when
        List<Emoji> emojis = emojiRepository.findAll();

        //then
        assertEquals("이름1", emojis.get(0).getName());
        assertEquals("이름2", emojis.get(1).getName());

    }

    @Test
    public void 이모지수정() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);
        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        //when
        List<Emoji> emojis = emojiRepository.findAll();
        for (Emoji emoji : emojis) {
            emojiService.updateEmoji(new EmojiUpdateDto(emoji.getId(), member.getId(),"이름바꿈", "설명도 바꿈"));
        }

        //then
        assertEquals("이름바꿈", emojis.get(0).getName());

    }

//    문제 생김
    @Test
    public void 이모지삭제() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        //when
        List<Emoji> emojis = emojiRepository.findAll();
        Long emojiId = emojis.get(0).getId();
        EmojiDeleteDto emojiDeleteDto = new EmojiDeleteDto(emojiId, member.getId());

        emojiService.deleteEmoji(emojiDeleteDto);

        //then

    }

    @Test
    public void 이모지상점만들기() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        List<Emoji> emojis = emojiRepository.findAll();
        Emoji emoji = emojis.get(0);

        //when
        Long emojiShopId = emojiService.makeEmojiShop(new EmojiShopDto(1400, emoji.getId()));

        //then
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopId).get();
        assertEquals(1400, emojiShop.getEmoji_price());

    }

    @Test
    public void 이모지상점수정() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        List<Emoji> emojis = emojiRepository.findAll();

        Long emojiShopId1 = emojiService.makeEmojiShop(new EmojiShopDto(1400,emojis.get(0).getId()));

        //when
        emojiService.updateEmojiShop(new EmojiShopUpdateDto(emojiShopId1, member.getId(), 1499));

        //then
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopId1).get();
        assertEquals(1499, emojiShop.getEmoji_price());

    }

//    문제 생김
    @Test
    public void 이모지상점삭제() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        EmojiCreateDto emojiCreateDto1 = new EmojiCreateDto(member.getId(),"이름1","1234","이모지 설명1");
        EmojiCreateDto emojiCreateDto2 = new EmojiCreateDto(member.getId(),"이름2","1235", "이모지 설명2");

        emojiService.makeEmoji(emojiCreateDto1);
        emojiService.makeEmoji(emojiCreateDto2);

        List<Emoji> emojis = emojiRepository.findAll();

        Long emojiShopId1 = emojiService.makeEmojiShop(new EmojiShopDto(1400, emojis.get(0).getId()));
        Long emojiShopId2 = emojiService.makeEmojiShop(new EmojiShopDto(2000, emojis.get(1).getId()));

        //when
        emojiService.deleteEmojiShop(emojiShopId1);

        //then


    }

    private Member getMember(String nickName) {
        Member member = Member.builder()
                .name("Lee")
                .memberEmail(nickName + "@gmail.com")
                .password("123123")
                .nickName(nickName)
                .build();
        return member;
    }


}