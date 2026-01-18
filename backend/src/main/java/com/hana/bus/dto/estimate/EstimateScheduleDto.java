package com.hana.bus.dto.estimate;

public class EstimateScheduleDto {

    private String tripType;   // oneway / round
    private String startDate;  // YYYY-MM-DD
    private String endDate;    // YYYY-MM-DD

    public EstimateScheduleDto() {
    }

    public String getTripType() {
        return tripType;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }
}
