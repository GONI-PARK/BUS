package com.hana.bus.dto.estimate.response;

import com.hana.bus.entity.*;
import java.util.List;
import java.util.stream.Collectors;

public class EstimateDetailResponse {

    private Long estimateId;
    private String status;
    private Basic basic;
    private Schedule schedule;
    private List<Route> routes;
    private List<Bus> buses;
    private Contact contact;

    public static EstimateDetailResponse from(
            Estimate estimate,
            EstimateSchedule scheduleEntity,
            List<EstimateRoute> routeEntities,
            List<EstimateBusRequest> busEntities,
            EstimateContact contactEntity
    ) {
        EstimateDetailResponse response = new EstimateDetailResponse();

        response.estimateId = estimate.getId();
        response.status = estimate.getStatus();

        response.basic = new Basic(
                estimate.getPurpose(),
                estimate.getAdultCount(),
                estimate.getChildCount(),
                estimate.getLuggageType()
        );

        if (scheduleEntity != null) {
            response.schedule = new Schedule(
                    scheduleEntity.getTripType(),
                    scheduleEntity.getStartDate().toString(),
                    scheduleEntity.getEndDate().toString()
            );
        }

        response.routes = routeEntities.stream()
                .map(Route::new)
                .collect(Collectors.toList());

        response.buses = busEntities.stream()
                .map(Bus::new)
                .collect(Collectors.toList());

        if (contactEntity != null) {
            response.contact = new Contact(contactEntity);
        }

        return response;
    }


    public static class Basic {
        public String purpose;
        public Integer adultCount;
        public Integer childCount;
        public String luggageType;

        public Basic(String purpose, Integer adultCount, Integer childCount, String luggageType) {
            this.purpose = purpose;
            this.adultCount = adultCount;
            this.childCount = childCount;
            this.luggageType = luggageType;
        }
    }

    public static class Schedule {
        public String tripType;
        public String startDate;
        public String endDate;

        public Schedule(String tripType, String startDate, String endDate) {
            this.tripType = tripType;
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }

    public static class Route {
        public String routeType;
        public Integer order;
        public String cityName;
        public String detailAddress;

        public Route(EstimateRoute route) {
            this.routeType = route.getRouteType();
            this.order = route.getRouteOrder();
            this.cityName = route.getCityName();
            this.detailAddress = route.getDetailAddress();
        }
    }

    public static class Bus {
        public String busType;
        public Integer busCount;

        public Bus(EstimateBusRequest bus) {
            this.busType = bus.getBusType();
            this.busCount = bus.getBusCount();
        }
    }

    public static class Contact {
        public String nameKanji;
        public String nameKana;
        public String phone;
        public String email;
        public String organizationName;

        public Contact(EstimateContact contact) {
            this.nameKanji = contact.getNameKanji();
            this.nameKana = contact.getNameKana();
            this.phone = contact.getPhone();
            this.email = contact.getEmail();
            this.organizationName = contact.getOrganizationName();
        }
    }
    
    
    public Long getEstimateId() {
        return estimateId;
    }

    public String getStatus() {
        return status;
    }

    public Basic getBasic() {
        return basic;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public List<Bus> getBuses() {
        return buses;
    }

    public Contact getContact() {
        return contact;
    }

}
