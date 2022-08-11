package com.ssafy.hool.repository;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.Deal_history;
import com.ssafy.hool.domain.point.PointType;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import com.ssafy.hool.dto.point_history.PointHistoryCreateDto;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.DealHistoryRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class DealHistoryRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    DealHistoryRepository dealHistoryRepository;
    @Autowired
    PointHistoryRepository pointHistoryRepository;
    @Autowired
    EmojiRepository emojiRepository;
    @Autowired
    EmojiShopRepository emojiShopRepository;

    @Test
    public void makeDeal(){
        Member buyer = getMember("Lee");
        Member seller = getMember("park");
        memberRepository.save(buyer);
        memberRepository.save(seller);

        Emoji emoji = Emoji.createEmoji(seller.getId(), "sonEmoji", "손흥민 이모지");
        emojiRepository.save(emoji);

        Emoji_shop emojiShop = Emoji_shop.createEmojiShop(emoji, 100);
        emojiShopRepository.save(emojiShop);

        DealHistoryCreateDto dealHistoryCreateDto = new DealHistoryCreateDto(seller.getId(), emojiShop.getId());
        Deal_history dealHistory = Deal_history.createDealHistory(dealHistoryCreateDto, emojiShop, buyer);
        dealHistoryRepository.save(dealHistory);

        PointHistoryCreateDto pointHistoryCreateDto = null;

        // 구매자 포인트기록(Point_History) 저장
        int currentBuyerPoint = buyer.getPoint() - dealHistory.getDealPoint();
        pointHistoryCreateDto = new PointHistoryCreateDto("이모지 구매", -dealHistory.getDealPoint(), currentBuyerPoint, PointType.DEAL);
        Point_history buyerPointHistory = Point_history.createPointHistory(pointHistoryCreateDto, buyer, dealHistory, null);
        pointHistoryRepository.save(buyerPointHistory);

        // 판매자 포인트기록(Point_History) 저장
        int currentSellerPoint = seller.getPoint() + dealHistory.getDealPoint();
        pointHistoryCreateDto = new PointHistoryCreateDto("이모지 판매", dealHistory.getDealPoint(), currentSellerPoint, PointType.DEAL);
        Point_history sellerPointHistory = Point_history.createPointHistory(pointHistoryCreateDto, seller, dealHistory, null);
        pointHistoryRepository.save(sellerPointHistory);

        Assertions.assertThat(sellerPointHistory.getDeal_point()).isEqualTo(-buyerPointHistory.getDeal_point());
        Assertions.assertThat(buyerPointHistory.getCurrent_point()).isEqualTo(-100);
        Assertions.assertThat(sellerPointHistory.getCurrent_point()).isEqualTo(100);
        Assertions.assertThat(buyer.getPoint()).isEqualTo(-100);
        Assertions.assertThat(seller.getPoint()).isEqualTo(100);

        //        Assertions.assertThat(pointHistoryRepository.findAll().size()).isEqualTo(2);

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