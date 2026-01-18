package com.hana.bus.dto.estimate;

public class EstimateBusRequestDto {

    private String busType;
    private Integer busCount;

    public EstimateBusRequestDto() {
    }

    public String getBusType() {
        return busType;
    }

    public Integer getBusCount() {
        return busCount;
    }
}
