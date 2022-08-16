package com.ssafy.hool.service.emoji;

import com.ssafy.hool.dto.emoji_shop.EmojiShopRankingDto;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmojiShopRankingService {

    private final EmojiShopRepository emojiShopRepository;


    @Cacheable(value = "ranking", cacheManager = "rankCacheManager")
    public List<EmojiShopRankingDto> getRanking(Pageable page){
        return emojiShopRepository.rankEmojiShop(page);
    }

//    @CachePut(value = "ranking", cacheManager = "rankCacheManager")
//    public List<EmojiShopRankingDto> updateRanking(){
//        return emojiShopRepository.rankEmojiShop();
//    }

    @CacheEvict(allEntries = true, value = "ranking", cacheManager = "rankCacheManager")
    public void cacheEvict(){
        System.out.println("all cache removed");
    }

}
