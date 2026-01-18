package com.hana.bus.dto.estimate;

public class EstimateRouteDto {

    private String routeType;
    private String prefectureCode;
    private String cityName;
    private String detailAddress;
    private Integer routeOrder;

    public EstimateRouteDto() {
    }

    public String getRouteType() {
        return routeType;
    }

    public String getPrefectureCode() {
        return prefectureCode;
    }

    public String getCityName() {
        return cityName;
    }

    public String getDetailAddress() {
        return detailAddress;
    }

    public Integer getRouteOrder() {
        return routeOrder;
    }
}
