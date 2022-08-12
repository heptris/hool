package com.ssafy.hool.config.oauth;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.member.MemberJoinDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.exception.ex.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@RequiredArgsConstructor
@Component
public class ClientGoogle {

    public Member getMember(String idToken) {

        BufferedReader in  = null;
        InputStream is = null;
        InputStreamReader isr = null;
        JSONParser jsonParser = new JSONParser();

        try {

            String url = "https://oauth2.googleapis.com/tokeninfo";
            url += "?id_token="+idToken;

            URL gUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) gUrl.openConnection();

            is = conn.getInputStream();
            isr = new InputStreamReader(is, "UTF-8");
            in = new BufferedReader(isr);


            JSONObject jsonObj = (JSONObject)jsonParser.parse(in);

            String name = jsonObj.get("name").toString();
            String nickName = name + "#" + jsonObj.get("sub").toString();
            String email = jsonObj.get("email").toString();
            String password = "hool";

            System.out.println(name);
            System.out.println(email);

            MemberJoinDto memberJoinDto = MemberJoinDto.builder()
                    .memberEmail(email)
                    .nickName(nickName)
                    .name(name)
                    .password(password)
                    .build();
            return memberJoinDto.toGoogleMember();


        }catch(Exception e) {
            throw new CustomException(INVALID_GOOGLE_ID_TOKEN);
        }
    }
}
