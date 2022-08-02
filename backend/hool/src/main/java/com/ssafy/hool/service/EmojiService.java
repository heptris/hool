package com.ssafy.hool.service;

import com.ssafy.hool.domain.Emoji;
import com.ssafy.hool.domain.Emoji_shop;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.domain.Member_emoji;
import com.ssafy.hool.dto.emoji.EmojiCreateDto;
import com.ssafy.hool.dto.emoji.EmojiDeleteDto;
import com.ssafy.hool.dto.emoji.EmojiDto;
import com.ssafy.hool.dto.emoji.EmojiUpdateDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopCreateDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.EmojiRepository;
import com.ssafy.hool.repository.EmojiShopRepository;
import com.ssafy.hool.repository.MemberEmojiRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Transactional
    public void makeEmoji(EmojiCreateDto emojiCreateDto){

        Member member = memberRepository.findById(emojiCreateDto.getMemberId()).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Emoji emoji = Emoji.createEmoji(member.getId(), emojiCreateDto.getName(), emojiCreateDto.getUrl(), emojiCreateDto.getDescription());

        Emoji savedEmoji = emojiRepository.save(emoji);

        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(member, savedEmoji);
        memberEmojiRepository.save(memberEmoji);

    }

    /**
     * 멤버 이모지만 삭제되는 경우
     */
    @Transactional
    public void deleteEmoji(EmojiDeleteDto emojiDeleteDto){
        Emoji emoji = emojiRepository.findById(emojiDeleteDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));

        Member member = memberRepository.findById(emojiDeleteDto.getMemberId()).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        // 연관관계 삭제
        member.getEmojis().remove(emoji);

        memberEmojiRepository.deleteEmoji(emojiDeleteDto.getEmojiId());
    }

    @Transactional
    public EmojiDto updateEmoji(EmojiUpdateDto emojiUpdateDto){

        Emoji emoji = emojiRepository.findById(emojiUpdateDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        // 받아오는 멤버 아이디와 만든이가 같을 경우 수정
        if(emojiUpdateDto.getMemberId() == emoji.getCreatorId()){
            emoji.setName(emojiUpdateDto.getUpdateName());
            emoji.setDescription(emojiUpdateDto.getUpdateDes());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }

        return new EmojiDto(emoji.getName(),emoji.getUrl(),emoji.getDescription(),emoji.getCreatorId());
    }

    @Transactional
    public Long makeEmojiShop(EmojiShopCreateDto emojiShopCreateDto){
        Emoji_shop emojiShop = Emoji_shop.createEmojiShop(emojiShopCreateDto.getEmoji(), emojiShopCreateDto.getPrice());
        emojiShopRepository.save(emojiShop);
        return emojiShop.getId();
    }

    @Transactional
    public EmojiShopCreateDto updateEmojiShop(EmojiShopUpdateDto emojiShopUpdateDto){
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopUpdateDto.getEmojiShopId())
                .orElseThrow(() -> new CustomException(EMOJISHOP_NOT_FOUND));
        Long creatorId = emojiShop.getEmoji().getCreatorId();
        if(emojiShopUpdateDto.getMemberId() == creatorId){
            emojiShop.setEmoji_price(emojiShopUpdateDto.getUpdatePrice());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }

        return new EmojiShopCreateDto(emojiShop.getEmoji(),emojiShop.getEmoji_price());
    }

    @Transactional
    public void deleteEmojiShop(Long emojiShopId){
        emojiShopRepository.deleteEmojiShop(emojiShopId);
    }

    public List<EmojiDto> listEmoji(){
        List<Emoji> emojis = emojiRepository.findAll();
        List<EmojiDto> list = new ArrayList<>();
        for (Emoji emoji : emojis){
            list.add(new EmojiDto(emoji.getName(), emoji.getUrl(), emoji.getDescription(), emoji.getCreatorId()));
        }
        return list;
    }

    public List<Member_emoji> listMemberEmoji(){
        return memberEmojiRepository.findAll();
    }

    public List<EmojiShopDto> listEmojiShop(){
        List<Emoji_shop> emojiShops = emojiShopRepository.findAll();
        List<EmojiShopDto> list = new ArrayList<>();
        for (Emoji_shop emojiShop : emojiShops) {
            list.add(new EmojiShopDto(emojiShop.getEmoji_price(), emojiShop.getEmoji().getId()));
        }
        return list;
    }

}