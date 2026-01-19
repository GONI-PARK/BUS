package com.hana.bus.dto.estimate;

import java.time.LocalDateTime;

public class EstimateListItemDto {

    private Long estimateId;
    private LocalDateTime createdAt;
    private String companyName;
    private String busType;
    private String customerName;
    private String phone;
    private String email;

    public EstimateListItemDto(
            Long estimateId,
            LocalDateTime createdAt,
            String companyName,
            String busType,
            String customerName,
            String phone,
            String email
    ) {
        this.estimateId = estimateId;
        this.createdAt = createdAt;
        this.companyName = companyName;
        this.busType = busType;
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
    }

    public Long getEstimateId() { return estimateId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getCompanyName() { return companyName; }
    public String getBusType() { return busType; }
    public String getCustomerName() { return customerName; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
}
