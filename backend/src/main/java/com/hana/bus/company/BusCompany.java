package com.hana.bus.company;

import jakarta.persistence.*;

@Entity
@Table(name = "bus_companies")
public class BusCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false, unique = true)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    protected BusCompany() {
    }

    public Long getId() {
        return id;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }

    public String getCompanyName() {
        return companyName;
    }
}
