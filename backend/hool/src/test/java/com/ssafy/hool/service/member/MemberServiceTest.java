package com.ssafy.hool.service.member;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.repository.friend.FriendRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.s3.AwsS3Service;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AwsS3Service awsS3Service;

    @Test
    void 중복_닉네임_체크() {
        boolean check = memberService.existsByNickName("messi");
        Assertions.assertThat(check).isEqualTo(true);
    }

    @Test
    void 회원가입() {
        Member member = new Member();
        member.setNickName("음바페");
        member.setPassword("1234");
        memberService.join(member);

        Member member2 = new Member();
        member2.setNickName("네이마르");
        member2.setPassword("1234");
        memberService.join(member2);

        Member member3 = new Member();
        member3.setNickName("홀란드");
        member3.setPassword("1234");
        memberService.join(member3);
    }


    @Test
    void 친구얼마나있는지() {
        Member member = memberService.findByMemberId(2L);
        System.out.println(member.getFriends().size());
        int friendCount = memberService.getFriendCount(2L);
        System.out.println(friendCount);

    }

    @Test
    void 테스트() {
        Date now = new Date();
        System.out.println(now.getTime());
    }

    @Test
    void 회원조회() {
        Member member = memberService.findByMemberId(20L);
    }

    @Test
    void querydslTest() {
        List<Member> members = memberRepository.findAllCustom();
        for (Member member : members) {
            System.out.println(member.getMemberEmail());
        }
    }

    @Test
    void 이모지즐겨찾기() {
        memberService.memberEmojiFavoriteToggle(1L, 1L);
    }


    @Test
    void 이미지테스트() {
        String thumbnailPath = awsS3Service.getThumbnailPath("member/default/1.jpg");
        System.out.println(thumbnailPath);

    }
    @Test
    void 숫자() {
        for (int i = 0; i < 10; i++) {
            int random = (int) (Math.random() * 6) + 1;
            System.out.println(random);
            String path = "member/default/" + random + ".jpg";
            String thumbnailPath = awsS3Service.getThumbnailPath(path);
            System.out.println(thumbnailPath);
        }
    }

}