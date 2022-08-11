package com.ssafy.hool.service.point;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.EmojiType;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.Deal_history;
import com.ssafy.hool.domain.point.PointType;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.deal_history.DealHistoryCreateDto;
import com.ssafy.hool.dto.deal_history.DealHistoryResponseDto;
import com.ssafy.hool.dto.point_history.PointHistoryCreateDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.emoji.MemberEmojiRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.DealHistoryRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import com.ssafy.hool.util.SecurityUtil;
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
    private final MemberEmojiRepository memberEmojiRepository;
    private final EmojiShopRepository emojiShopRepository;
    private final EmojiRepository emojiRepository;

    /**
     * 이모지상점에서 이모지 구매
     * @param dealHistoryCreateDto
     */
    public DealHistoryResponseDto makeDeal(DealHistoryCreateDto dealHistoryCreateDto, Long memberId){
        Member buyer = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Member seller = memberRepository.findById(dealHistoryCreateDto.getSellerMemberId()).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Emoji_shop emojiShop = emojiShopRepository.findById(dealHistoryCreateDto.getEmojiShopId()).orElseThrow(() -> new CustomException(EMOJI_SHOP_NOT_FOUND));
        Deal_history dealHistory = Deal_history.createDealHistory(dealHistoryCreateDto, emojiShop, buyer);
        dealHistoryRepository.save(dealHistory);

        PointHistoryCreateDto pointHistoryCreateDto = null;

        // 구매자 포인트기록(Point_History) 저장
        int currentBuyerPoint = buyer.getPoint() - dealHistory.getDealPoint();
        if(currentBuyerPoint >= 0){
            pointHistoryCreateDto = new PointHistoryCreateDto("이모지 구매", -dealHistory.getDealPoint(), currentBuyerPoint, PointType.DEAL);
            Point_history buyerPointHistory = Point_history.createPointHistory(pointHistoryCreateDto, buyer, dealHistory, null);
            pointHistoryRepository.save(buyerPointHistory);
        } else {
            throw new CustomException(LACK_OF_POINT);
        }

        // 판매자 포인트기록(Point_History) 저장
        int currentSellerPoint = seller.getPoint() + dealHistory.getDealPoint();
        pointHistoryCreateDto = new PointHistoryCreateDto("이모지 판매", dealHistory.getDealPoint(), currentSellerPoint, PointType.DEAL);
        Point_history sellerPointHistory = Point_history.createPointHistory(pointHistoryCreateDto, seller, dealHistory, null);
        pointHistoryRepository.save(sellerPointHistory);

        Emoji emoji = emojiRepository.findById(emojiShop.getEmoji().getId()).orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));

        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(buyer, emoji);
        memberEmoji.setEmojitype(EmojiType.BUY);
        memberEmojiRepository.save(memberEmoji);

        return new DealHistoryResponseDto(emoji.getName(), emoji.getDescription(), dealHistory.getDealPoint());
    }
}

