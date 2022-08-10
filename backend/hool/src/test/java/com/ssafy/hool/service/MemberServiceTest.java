package com.ssafy.hool.service;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.exception.ex.ErrorCode;
import com.ssafy.hool.repository.friend.FriendRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.service.member.MemberService;
import org.assertj.core.api.Assertions;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStream;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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
    private FriendRepository friendRepository;

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
    void 회원탈퇴() {
        memberService.deleteMember(3L);
    }

    @Test
    void 회원수정() {
        memberService.updateMember(1L, "1235", "회원", "음바페1");
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
        memberService.memberEmojiFavoriteToggle(4L, 2L);
    }


    @Test
    void test() {
        BufferedReader in  = null;
        InputStream is = null;
        InputStreamReader isr = null;
        JSONParser jsonParser = new JSONParser();

        String userId = null;

        try {
            String idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ0MDEzMDAyMzc3LXRtZ25qNGo5djk5cHY1dm5hcG45Y2VnMWJlYm4zdXQyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ0MDEzMDAyMzc3LXRtZ25qNGo5djk5cHY1dm5hcG45Y2VnMWJlYm4zdXQyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDQ3NTE3OTIzMzU2ODc1Mzc2IiwiZW1haWwiOiJsb3Zla2llajkyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUXNxN0VOaDV2SzUtRzBmMjBxU1hGZyIsIm5hbWUiOiLsi6DsnYDsoJUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbmUwajNrMzR0YjJDOGtzeGd2VF9ZdHE5WHN0ZmpJc0UtekQ1UkM9czk2LWMiLCJnaXZlbl9uYW1lIjoi7J2A7KCVIiwiZmFtaWx5X25hbWUiOiLsi6AiLCJsb2NhbGUiOiJrbyIsImlhdCI6MTY2MDAyNjQ0MCwiZXhwIjoxNjYwMDMwMDQwLCJqdGkiOiI2NWY1MmI1MDNkMDEyZmMyMTRmMjNjZTQwOWFlNjAzOTkyMDMzMTQxIn0.EUx_on2APNjxsvkQhPFV12oA-2x1pd1yCNdF60u6h-EZbJDQSaIBClvz_nynFzw5Pa61uJe7YDWxumUgyB-ZsOBuMbMXEzYHQdO7lGcbDXEcooyGX12PDvhjdTMdyMPDW5oi9q87jfEqBM3q3pIfkfLnMQldkOkEEgfSUTaiLJIxxI3_VcJC2PGYQWDrqVUELYFdGa0sRjcNgbjnHtqAXkmTWhMp_NjLNg-rV77IXa7UcoH1kWKWYyAwrZvjqlwGlgbu0kidLnFaqCAWtLW25W-zWPkbLC-1YE9sb2Z8I43kXmPgOOqs7sKQGo_1DFHqlEFngVURtSsn3dLpJmuTxQ";


            String url = "https://oauth2.googleapis.com/tokeninfo";
            url += "?id_token=" + idToken;

            URL gUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) gUrl.openConnection();

            is = conn.getInputStream();
            isr = new InputStreamReader(is, "UTF-8");
            in = new BufferedReader(isr);


            JSONObject jsonObj = (JSONObject) jsonParser.parse(in);

            userId = jsonObj.get("sub").toString();
            String name = jsonObj.get("name").toString();
            String email = jsonObj.get("email").toString();
            String imageUrl = jsonObj.get("picture").toString();

            System.out.println(userId);
            System.out.println(name);
            System.out.println(email);
            System.out.println(imageUrl);

        } catch (Exception e) {
//            throw new CustomException(ErrorCode.INVALID_GOOGLE_ID_TOKEN);
            e.printStackTrace();
        }
    }

}