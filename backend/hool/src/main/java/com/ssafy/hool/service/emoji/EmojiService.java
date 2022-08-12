package com.ssafy.hool.service.emoji;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.domain.s3.AwsS3;
import com.ssafy.hool.dto.emoji.*;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopListDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
import com.ssafy.hool.dto.response.CursorResult;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.emoji.MemberEmojiRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.s3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmojiService {

    private final EmojiRepository emojiRepository;
    private final MemberEmojiRepository memberEmojiRepository;
    private final EmojiShopRepository emojiShopRepository;
    private final MemberRepository memberRepository;

    private final AwsS3Service awsS3Service;

    @Transactional
    public void makeEmoji(MultipartFile multipartFile, EmojiCreateDto emojiCreateDto, Long memberId){

        Member member = memberRepository.findById(memberId).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Emoji emoji = Emoji.createEmoji(memberId, emojiCreateDto.getName(), emojiCreateDto.getDescription());

        Emoji savedEmoji = emojiRepository.save(emoji);

        if(emojiCreateDto.getEmojiAnimate() != null) savedEmoji.setEmojiAnimate(emojiCreateDto.getEmojiAnimate());

        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(member, savedEmoji);
        memberEmojiRepository.save(memberEmoji);
        AwsS3 awsS3 = new AwsS3();

        System.out.println("========================================");
        try {
            awsS3 = awsS3Service.upload(multipartFile, "emoji");
            System.out.println("들어왔습니다~~~~~~~~~~~=========================================");
        }catch (IOException e){
            System.out.println(e);
        }

        String url = awsS3.getPath();
        savedEmoji.setUrl(url);
    }

    // @ModelAttribute용 service
//    @Transactional
//    public void makeEmoji(EmojiS3Dto emojiS3Dto, Long memberId){
//
//        Member member = memberRepository.findById(memberId).
//                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
//        Emoji emoji = Emoji.createEmoji(memberId, emojiS3Dto.getName(), emojiS3Dto.getDescription());
//
//        Emoji savedEmoji = emojiRepository.save(emoji);
//
//        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(member, savedEmoji);
//        memberEmojiRepository.save(memberEmoji);
//        AwsS3 awsS3 = new AwsS3();
//
//        System.out.println("========================================");
//        try {
//            awsS3 = awsS3Service.upload(emojiS3Dto.getMultipartFile(), "emoji");
//            System.out.println("들어왔습니다~~~~~~~~~~~=========================================");
//        }catch (IOException e){
//            System.out.println(e);
//        }
//
//        String url = awsS3.getPath();
//        savedEmoji.setUrl(url);
//    }

    /**
     * 멤버 이모지만 삭제되는 경우
     */
    @Transactional
    public void deleteEmoji(EmojiDeleteDto emojiDeleteDto, Long memberId){
        Emoji emoji = emojiRepository.findById(emojiDeleteDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));

        Member member = memberRepository.findById(memberId).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        // 연관관계 삭제
        member.getEmojis().remove(emoji);

        memberEmojiRepository.deleteEmoji(emojiDeleteDto.getEmojiId(), memberId);
    }

    @Transactional
    public void updateEmoji(EmojiUpdateDto emojiUpdateDto, Long memberId){

        Emoji emoji = emojiRepository.findById(emojiUpdateDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        // 받아오는 멤버 아이디와 만든이가 같을 경우 수정
        if(memberId == emoji.getCreatorId()){
            emoji.setName(emojiUpdateDto.getUpdateName());
            emoji.setDescription(emojiUpdateDto.getUpdateDes());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }
    }

    @Transactional
    public Long makeEmojiShop(EmojiShopDto emojiShopDto){
        Emoji emoji = emojiRepository.findById(emojiShopDto.getEmojiId()).orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        Emoji_shop emojiShop = Emoji_shop.createEmojiShop(emoji, emojiShopDto.getPrice());
        emojiShopRepository.save(emojiShop);
        return emojiShop.getId();
    }

    @Transactional
    public EmojiShopDto updateEmojiShop(EmojiShopUpdateDto emojiShopUpdateDto, Long memberId){
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopUpdateDto.getEmojiShopId())
                .orElseThrow(() -> new CustomException(EMOJI_SHOP_NOT_FOUND));
        Long creatorId = emojiShop.getEmoji().getCreatorId();
        if(memberId == creatorId){
            emojiShop.setEmoji_price(emojiShopUpdateDto.getUpdatePrice());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }

        return new EmojiShopDto(emojiShop.getEmoji_price(), emojiShop.getEmoji().getId());
    }

    @Transactional
    public void deleteEmojiShop(Long emojiShopId){
        emojiShopRepository.deleteEmojiShop(emojiShopId);
    }

//    public List<EmojiDto> listEmoji(){
//        List<Emoji> emojis = emojiRepository.findAll();
//        List<EmojiDto> list = new ArrayList<>();
//        for (Emoji emoji : emojis){
//            list.add(new EmojiDto(emoji.getName(), emoji.getUrl(), emoji.getDescription(), emoji.getCreatorId()));
//        }
//        return list;
//    }

    public List<MemberEmojiDto> listMemberEmoji(Long memberId){
        return memberEmojiRepository.getMyEmojis(memberId);
    }

    public List<EmojiShopDto> listEmojiShop(){
        return emojiShopRepository.getEmojiShop();
    }

    public List<EmojiDto> listCanEmojiShop(Long memberId){
        List<Long> sellingEmojiList = emojiRepository.sellingEmojis(memberId);
        return emojiRepository.madeByMeEmojis(sellingEmojiList, memberId);
    }

    // -------------------------------Emoji Shop Paging Start--------------------------------------------

    public CursorResult get(Long cursorId, Pageable page) {
        final List<EmojiShopListDto> emoji_shops = getEmojiShop(cursorId, page);
        final Long lastIdOfList = emoji_shops.isEmpty() ?
                null : emoji_shops.get(emoji_shops.size() - 1).getEmojiShopId();

        return new CursorResult<>(emoji_shops, hasNext(lastIdOfList), lastIdOfList);
    }

    private List<EmojiShopListDto> getEmojiShop(Long id, Pageable page) {
        return id == null ?
                emojiShopRepository.findEmojiShopListDtoPage(page) :
                emojiShopRepository.findEmojiShopListDtoLessPage(id, page);
    }

    private Boolean hasNext(Long id) {
        if (id == null) return false;
        return emojiShopRepository.existsByIdLessThan(id);
    }

    // -------------------------------Emoji Shop Paging End--------------------------------------------

    // -------------------------------Can Emoji Shop Paging Start--------------------------------------------

    public CursorResult getCanEmojiShopList(Long memberId, Long cursorId, Pageable page) {
        List<Long> sellingEmojiList = emojiRepository.sellingEmojis(memberId);
        List<CanEmojiDto> canEmojiShopListDto = getCanEmojiShopListDto(sellingEmojiList, memberId, cursorId, page);

        final Long lastIdOfList = canEmojiShopListDto.isEmpty() ?
                null : canEmojiShopListDto.get(canEmojiShopListDto.size() - 1).getMemberEmojiId();

        return new CursorResult<>(canEmojiShopListDto, hasCanEmojiShopNext(sellingEmojiList, memberId, lastIdOfList), lastIdOfList);
    }

    public List<CanEmojiDto> getCanEmojiShopListDto(List<Long> sellingEmojiList, Long memberId, Long cursorId, Pageable page) {

        if (cursorId == null) {
            return emojiRepository.madeByMeEmojisDescPage(sellingEmojiList, memberId, page);
        } else {
            return emojiRepository.madeByMeEmojisDescLessPage(sellingEmojiList, memberId, cursorId, page);
        }
    }

    public Boolean hasCanEmojiShopNext(List<Long> sellingEmojiList, Long memberId, Long cursorId) {
        if (cursorId == null) return false;
        return emojiRepository.existsMadeByMeEmojis(sellingEmojiList, memberId, cursorId);
    }

    // -------------------------------Can Emoji Shop Paging End--------------------------------------------

    public List<EmojiShopListDto> searchEmojiShopList(String keyword){
        return emojiShopRepository.searchEmojiShop(keyword);
    }

}
