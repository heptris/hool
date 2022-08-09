package com.ssafy.hool.config;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.Valid;

import static org.junit.jupiter.api.Assertions.*;

class JasyptConfigTest {

    @Value("${spring.mail.username}")
    private String username;

    @Test
    void jasypt() {
        String username = "wjsgksdnf11@naver.com";
        String password = "dahamkei11!";

        String encryptUsername = jasyptEncoding(username);
        String encryptPassword = jasyptEncoding(password);

        System.out.println(encryptUsername);
        System.out.println(encryptPassword);
    }

    @Test
    void 테스트() {
        System.out.println(username);
    }

    public String jasyptEncoding(String value) {

        String key = "my_jasypt_key";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.encrypt(value);
    }
}