package com.hana.bus.dto.bus;

public class BusScheduleListResponseDto {

    private String companyName;
    private String busType;
    private String departure;
    private String arrival;
    private String operationTime;

    public BusScheduleListResponseDto(
            String companyName,
            String busType,
            String departure,
            String arrival,
            String operationTime
    ) {
        this.companyName = companyName;
        this.busType = busType;
        this.departure = departure;
        this.arrival = arrival;
        this.operationTime = operationTime;
    }

    public String getCompanyName() { return companyName; }
    public String getBusType() { return busType; }
    public String getDeparture() { return departure; }
    public String getArrival() { return arrival; }
    public String getOperationTime() { return operationTime; }
}
