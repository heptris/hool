package com.ssafy.hool.service.emoji;

import com.ssafy.hool.dto.emoji_shop.EmojiRankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class EmojiShopRankingService {

    private final RedisTemplate redisTemplate;

//    public List<EmojiRankingDto> getRankingList(){
//        String key = "ranking";
//        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
//
//
//    }
}
