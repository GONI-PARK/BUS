package com.hana.bus.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "estimate_contacts")
public class EstimateContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estimate_id", nullable = false)
    private Estimate estimate;

    private String nameKanji;
    private String nameKana;
    private String email;
    private String phone;
    private String contactTime;
    private String organizationName;
    private String note;
    private String travelAgencyName;

    protected EstimateContact() {}

    public EstimateContact(
            Estimate estimate,
            String nameKanji,
            String nameKana,
            String email,
            String phone,
            String contactTime,
            String organizationName,
            String note,
            String travelAgencyName
    ) {
        this.estimate = estimate;
        this.nameKanji = nameKanji;
        this.nameKana = nameKana;
        this.email = email;
        this.phone = phone;
        this.contactTime = contactTime;
        this.organizationName = organizationName;
        this.note = note;
        this.travelAgencyName = travelAgencyName;
    }
}
