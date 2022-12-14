package com.ssafy.hool.domain.emoji;

import com.ssafy.hool.domain.BaseEntity;
import com.ssafy.hool.domain.member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member_emoji extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_emoji_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emoji_id")
    private Emoji emoji;

    private Boolean is_favorite;

    @Enumerated(EnumType.STRING)
    @Column(name = "emoji_type")
    private EmojiType emojitype;

    public static Member_emoji createMemberEmoji(Member member, Emoji emoji){
        Member_emoji memberEmoji = Member_emoji.builder()
                .emojitype(EmojiType.MADE)
                .is_favorite(false)
                .build();
        memberEmoji.setMember(member);
        memberEmoji.setEmoji(emoji);
        return memberEmoji;
    }

    public static Member_emoji createDefaultMemberEmoji(Member member, Emoji emoji){
        Member_emoji memberEmoji = Member_emoji.builder()
                .emojitype(EmojiType.DEFAULT)
                .is_favorite(false)
                .build();
        memberEmoji.setMember(member);
        memberEmoji.setEmoji(emoji);
        return memberEmoji;
    }


    public void setEmoji(Emoji emoji){
        this.emoji = emoji;
        emoji.getMemberEmojiList().add(this);
    }

    public void setMember(Member member){
        this.member = member;
        member.getEmojis().add(this);
    }

    public void updateFavorite(boolean fav) {
        this.is_favorite = fav;
    }
}
