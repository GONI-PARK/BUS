package com.hana.bus.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptPasswordGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "1234"; // ← 네가 로그인에 쓸 비밀번호
        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("원문 비밀번호: " + rawPassword);
        System.out.println("BCrypt 결과: " + encodedPassword);
    }
}
