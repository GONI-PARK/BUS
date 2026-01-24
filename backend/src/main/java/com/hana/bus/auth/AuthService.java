package com.hana.bus.auth;

import com.hana.bus.company.BusCompany;
import com.hana.bus.company.BusCompanyRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final BusCompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthService(
        BusCompanyRepository companyRepository,
        PasswordEncoder passwordEncoder,
        JwtProvider jwtProvider
    ) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    public Map<String, Object> login(LoginRequest request) {

        BusCompany company = companyRepository
            .findByLoginId(request.getLoginId())
            .orElseThrow(() -> new RuntimeException("로그인 실패"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                company.getPassword())) {
            throw new RuntimeException("로그인 실패");
        }

        String token = jwtProvider.createToken(company.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", token);
        result.put("companyName", company.getCompanyName());

        return result;
    }
}
