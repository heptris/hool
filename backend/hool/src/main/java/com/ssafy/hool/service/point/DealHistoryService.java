package com.ssafy.hool.service.point;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.Deal_history;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import com.ssafy.hool.dto.deal_history.DealHistoryResponseDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.DealHistoryRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class DealHistoryService {

    private final DealHistoryRepository dealHistoryRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final MemberRepository memberRepository;
    private final EmojiShopRepository emojiShopRepository;
    private final EmojiRepository emojiRepository;

    /**
     * 이모지상점에서 이모지 구매
     * @param dealHistoryCreateDto
     */
    public DealHistoryResponseDto makeDeal(DealHistoryCreateDto dealHistoryCreateDto){
        Member buyer = memberRepository.findById(dealHistoryCreateDto.getBuyerMemberId()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Member seller = memberRepository.findById(dealHistoryCreateDto.getSellerMemberId()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Emoji_shop emojiShop = emojiShopRepository.findById(dealHistoryCreateDto.getEmojiShopId()).orElseThrow(() -> new CustomException(EMOJI_SHOP_NOT_FOUND));
        Deal_history dealHistory = Deal_history.createDealHistory(dealHistoryCreateDto, emojiShop, buyer);
        dealHistoryRepository.save(dealHistory);

        // 구매자 포인트기록(Point_History) 저장
        int currentBuyerPoint = buyer.getPoint() - dealHistory.getDealPoint();
        if(currentBuyerPoint >= 0){
            Point_history buyerPointHistory = Point_history.createPointHistory(-dealHistory.getDealPoint(), currentBuyerPoint, buyer, dealHistory, null);
            pointHistoryRepository.save(buyerPointHistory);
        } else {
            throw new CustomException(LACK_OF_POINT);
        }

        // 판매자 포인트기록(Point_History) 저장
        int currentSellerPoint = seller.getPoint() + dealHistory.getDealPoint();
        Point_history sellerPointHistory = Point_history.createPointHistory(dealHistory.getDealPoint(), currentSellerPoint, seller, dealHistory, null);
        pointHistoryRepository.save(sellerPointHistory);

        Emoji emoji = emojiRepository.findById(emojiShop.getEmoji().getId()).orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        return new DealHistoryResponseDto(emoji.getName(), emoji.getDescription(), dealHistory.getDealPoint());
    }
}

