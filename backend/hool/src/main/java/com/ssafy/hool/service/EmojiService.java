package com.ssafy.hool.service;

import com.ssafy.hool.domain.Emoji;
import com.ssafy.hool.domain.Emoji_shop;
import com.ssafy.hool.domain.Member;
import com.ssafy.hool.domain.Member_emoji;
import com.ssafy.hool.repository.EmojiRepository;
import com.ssafy.hool.repository.EmojiShopRepository;
import com.ssafy.hool.repository.MemberEmojiRepository;
import com.ssafy.hool.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmojiService {

    private final EmojiRepository emojiRepository;
    private final MemberEmojiRepository memberEmojiRepository;
    private final EmojiShopRepository emojiShopRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void makeEmoji(String name, String url, String description, Long memberId){

        Member member = memberRepository.findById(memberId).get();
        Emoji emoji = Emoji.createEmoji(member.getId(), name, url, description);

        Emoji savedEmoji = emojiRepository.save(emoji);

        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(member, savedEmoji);
        memberEmojiRepository.save(memberEmoji);

    }

    @Transactional
    public void deleteEmoji(Long emojiId, Long memberId){
        Emoji emoji = emojiRepository.findById(emojiId).get();

        Member member = memberRepository.findById(memberId).get();
        // 연관관계 삭제
        member.getEmojis().remove(emoji);

        memberEmojiRepository.deleteEmoji(emojiId);
    }

    @Transactional
    public void updateEmoji(Long emojiId, Long memberId, String updateName, String updateDes){
        Emoji emoji = emojiRepository.findById(emojiId).get();
        // 받아오는 멤버 아이디와 만든이가 같을 경우 수정
        if(memberId == emoji.getCreatorId()){
            emoji.setName(updateName);
            emoji.setDescription(updateDes);
        }else{
            throw new IllegalStateException("수정 권한이 없습니다.");
        }
    }

    @Transactional
    public Long makeEmojiShop(Emoji emoji, int price){
        Emoji_shop emojiShop = Emoji_shop.createEmojiShop(emoji, price);
        emojiShopRepository.save(emojiShop);
        return emojiShop.getId();
    }

    @Transactional
    public void updateEmojiShop(Long emojiShopId, Long memberId, int price){
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopId).get();
        Long creatorId = emojiShop.getEmoji().getCreatorId();
        if(memberId == creatorId){
            emojiShop.setEmoji_price(price);
        }else{
            throw new IllegalStateException("수정 권한이 없습니다.");
        }
    }

    @Transactional
    public void deleteEmojiShop(Long emojiShopId){
        emojiShopRepository.deleteEmojiShop(emojiShopId);
    }

    public List<Emoji> listEmoji(){
        return emojiRepository.findAll();
    }

    public List<Member_emoji> listMemberEmoji(){
        return memberEmojiRepository.findAll();
    }

    public List<Emoji_shop> listEmojiShop(){
        return emojiShopRepository.findAll();
    }

}
