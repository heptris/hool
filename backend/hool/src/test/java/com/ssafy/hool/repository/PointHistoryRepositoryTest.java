package com.ssafy.hool.repository;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import com.ssafy.hool.dto.point_history.PointHistoryListResponseDto;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.DealHistoryRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import com.ssafy.hool.service.point.DealHistoryService;
import com.ssafy.hool.service.point.PointHistoryService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class PointHistoryRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PointHistoryRepository pointHistoryRepository;
    @Autowired
    PointHistoryService pointHistoryService;
    @Autowired
    EmojiRepository emojiRepository;
    @Autowired
    EmojiShopRepository emojiShopRepository;
    @Autowired
    DealHistoryRepository dealHistoryRepository;
    @Autowired
    DealHistoryService dealHistoryService;
    @Test
    public void pointListTest(){
        Member member1 = getMember("Lee111");
        Member member2 = getMember("Lee222");
        Member member3 = getMember("Lee333");
        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);

        Emoji emoji1 = Emoji.createEmoji(member2.getId(), "sonEmoji", "urltest", "손흥민 이모지");
        Emoji emoji2 = Emoji.createEmoji(member3.getId(), "holEmoji", "urltest", "홀란드 이모지");
        emojiRepository.save(emoji1);
        emojiRepository.save(emoji2);

        Emoji_shop emojiShop1 = Emoji_shop.createEmojiShop(emoji1, 150);
        Emoji_shop emojiShop2 = Emoji_shop.createEmojiShop(emoji2, 100);
        emojiShopRepository.save(emojiShop1);
        emojiShopRepository.save(emojiShop2);

        DealHistoryCreateDto dealHistoryCreateDto1 = new DealHistoryCreateDto(member2.getId(), emojiShop1.getId());
        DealHistoryCreateDto dealHistoryCreateDto2 = new DealHistoryCreateDto(member3.getId(), emojiShop2.getId());

        dealHistoryService.makeDeal(dealHistoryCreateDto1, member1.getId());
        dealHistoryService.makeDeal(dealHistoryCreateDto2, member1.getId());

        List<PointHistoryListResponseDto> pointList = pointHistoryService.pointList(member1.getId());

        Assertions.assertThat(pointList.get(0).getDealtPoint()).isEqualTo(-100);
        Assertions.assertThat(pointList.get(1).getDealtPoint()).isEqualTo(-150);
        Assertions.assertThat(pointList.size()).isEqualTo(2);
    }

    private Member getMember(String nickName) {
        Member member = Member.builder()
                .name("Lee")
                .memberEmail(nickName + "@gmail.com")
                .password("123123")
                .point(500)
                .nickName(nickName)
                .build();
        return member;
    }

}