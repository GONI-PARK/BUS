package com.hana.bus.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "estimate_routes")
public class EstimateRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estimate_id", nullable = false)
    private Estimate estimate;

    private String routeType;
    private String prefectureCode;
    private String cityName;
    private String detailAddress;
    private Integer routeOrder;

    protected EstimateRoute() {}

    public EstimateRoute(
            Estimate estimate,
            String routeType,
            String prefectureCode,
            String cityName,
            String detailAddress,
            Integer routeOrder
    ) {
        this.estimate = estimate;
        this.routeType = routeType;
        this.prefectureCode = prefectureCode;
        this.cityName = cityName;
        this.detailAddress = detailAddress;
        this.routeOrder = routeOrder;
    }
    
    public String getRouteType() {
        return routeType;
    }

    public Integer getRouteOrder() {
        return routeOrder;
    }

    public String getCityName() {
        return cityName;
    }

    public String getDetailAddress() {
        return detailAddress;
    }

}
