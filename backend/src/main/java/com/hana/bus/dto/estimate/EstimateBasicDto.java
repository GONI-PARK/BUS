package com.hana.bus.dto.estimate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class EstimateBasicDto {

    @NotNull
    private String purpose;          // 이용 목적
    
    @NotNull
    @Min(1)
    private Integer adultCount;
    
    @NotNull
    @Min(0)
    private Integer childCount;
    
    @NotNull
    private String luggageType;      // many / hand

    public EstimateBasicDto() {
    }

    public String getPurpose() {
        return purpose;
    }

    public Integer getAdultCount() {
        return adultCount;
    }

    public Integer getChildCount() {
        return childCount;
    }

    public String getLuggageType() {
        return luggageType;
    }
}
