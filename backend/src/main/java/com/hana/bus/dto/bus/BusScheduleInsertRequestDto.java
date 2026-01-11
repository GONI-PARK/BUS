package com.hana.bus.dto.bus;

public class BusScheduleInsertRequestDto {

    private String companyName;
    private String busType;
    private String departure;
    private String arrival;
    private String operationTime;

    public BusScheduleInsertRequestDto() {
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getBusType() {
        return busType;
    }

    public String getDeparture() {
        return departure;
    }

    public String getArrival() {
        return arrival;
    }

    public String getOperationTime() {
        return operationTime;
    }
}
