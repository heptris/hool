package com.ssafy.hool.service;

import com.ssafy.hool.domain.Emoji_shop;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import com.ssafy.hool.repository.DealHistoryRepository;
import com.ssafy.hool.repository.MemberRepository;
import com.ssafy.hool.repository.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DealHistoryService {

    private final DealHistoryRepository dealHistoryRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final MemberRepository memberRepository;
//    private final EmojiShopRepository emojiShopRepository;

    public void makeDeal(DealHistoryCreateDto dealHistoryCreateDto, Long memberId, Long emojiShopId){
        Member buyer = memberRepository.findById(memberId).get();
        Member seller = memberRepository.findById(dealHistoryCreateDto.getSellerMemberId()).get();
//        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopId).get();
        Emoji_shop emojiShop = null;
        Deal_history dealHistory = Deal_history.createDealHistory(dealHistoryCreateDto, emojiShop, buyer);
        dealHistoryRepository.save(dealHistory);

        // 구매자 포인트기록(Point_History) 저장
        int currentBuyerPoint = buyer.getPoint() - dealHistory.getDealPoint();
        Point_history buyerPointHistory = Point_history.createPointHistory(-dealHistory.getDealPoint(), currentBuyerPoint, buyer, dealHistory, null);
        pointHistoryRepository.save(buyerPointHistory);

        // 판매자 포인트기록(Point_History) 저장
        int currentSellerPoint = seller.getPoint() + dealHistory.getDealPoint();
        Point_history sellerPointHistory = Point_history.createPointHistory(dealHistory.getDealPoint(), currentSellerPoint, seller, dealHistory, null);
        pointHistoryRepository.save(sellerPointHistory);
    }
}

