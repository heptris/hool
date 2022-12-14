package com.ssafy.hool.dto.emoji;

import com.ssafy.hool.domain.emoji.EmojiAnimate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmojiS3Dto {
    private String name;
    private String description;
    private EmojiAnimate emojiAnimate;
    private MultipartFile multipartFile;
}
