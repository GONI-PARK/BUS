package com.hana.bus.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private static final long EXP_TIME = 1000 * 60 * 60; // 1시간

    public String createToken(Long companyId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXP_TIME);

        return Jwts.builder()
            .claim("companyId", companyId)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
            .compact();
    }

    public Long getCompanyId(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(secretKey.getBytes())
            .build()
            .parseClaimsJws(token)
            .getBody();

        return claims.get("companyId", Long.class);
    }
}
