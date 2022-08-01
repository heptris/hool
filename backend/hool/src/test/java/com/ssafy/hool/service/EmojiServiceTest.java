package com.ssafy.hool.service;

import com.ssafy.hool.domain.*;
import com.ssafy.hool.repository.EmojiRepository;
import com.ssafy.hool.repository.EmojiShopRepository;
import com.ssafy.hool.repository.MemberEmojiRepository;
import com.ssafy.hool.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class EmojiServiceTest {

    @Autowired EmojiService emojiService;
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
        emojiService.makeEmoji("이름","1234", "이모지 설명", member.getId());

//         then
        List<Emoji> emojiList = emojiRepository.findAll();
        List<Member_emoji> memberEmojiList = memberEmojiRepository.findAll();
        Emoji emoji = emojiList.get(0);
        Member_emoji memberEmoji = memberEmojiList.get(0);

        assertEquals("1234", emoji.getUrl());
        assertEquals("이모지 설명",emoji.getDescription());
        assertEquals(EmojiType.MADE, memberEmoji.getEmojitype());
    }

    @Test
    public void 이모지리스트() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        //when
        List<Emoji> emojis = emojiService.listEmoji();

        //then
        assertEquals("이름1", emojis.get(0).getName());
        assertEquals("이름2", emojis.get(1).getName());

    }

    @Test
    public void 이모지수정() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        //when
        List<Emoji> emojis = emojiService.listEmoji();
        for (Emoji emoji : emojis) {
            emojiService.updateEmoji(emoji.getId(),member.getId(),"이름바꿈", "설명도바꿈");
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

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        //when
        List<Emoji> emojis = emojiService.listEmoji();
        Long emojiId = emojis.get(0).getId();
        System.out.println("==========================");
        System.out.println(emojiId);

        emojiService.deleteEmoji(emojiId, member.getId());

        //then

    }

    @Test
    public void 이모지상점만들기() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        List<Emoji> emojis = emojiService.listEmoji();
        Emoji emoji = emojis.get(0);

        //when
        Long emojiShopId = emojiService.makeEmojiShop(emoji, 1400);

        //then
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopId).get();
        assertEquals(1400, emojiShop.getEmoji_price());

    }

    @Test
    public void 이모지상점수정() throws Exception{
        //given
        Member member = getMember("1");
        memberRepository.save(member);

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        List<Emoji> emojis = emojiService.listEmoji();

        Long emojiShopId1 = emojiService.makeEmojiShop(emojis.get(0), 1400);

        //when
        emojiService.updateEmojiShop(emojiShopId1, member.getId(), 1499);

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

        emojiService.makeEmoji("이름1","1234", "이모지 설명1", member.getId());
        emojiService.makeEmoji("이름2","1235", "이모지 설명2", member.getId());

        List<Emoji> emojis = emojiService.listEmoji();

        Long emojiShopId1 = emojiService.makeEmojiShop(emojis.get(0), 1400);
        Long emojiShopId2 = emojiService.makeEmojiShop(emojis.get(1), 2000);

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