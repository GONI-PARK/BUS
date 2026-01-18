package com.hana.bus.dto.estimate;

import java.util.List;

public class EstimateCreateRequestDto {

    private EstimateBasicDto basic;
    private EstimateScheduleDto schedule;
    private List<EstimateRouteDto> routes;
    private List<EstimateBusRequestDto> buses;
    private EstimateContactDto contact;

    public EstimateCreateRequestDto() {
    }

    public EstimateBasicDto getBasic() {
        return basic;
    }

    public EstimateScheduleDto getSchedule() {
        return schedule;
    }

    public List<EstimateRouteDto> getRoutes() {
        return routes;
    }

    public List<EstimateBusRequestDto> getBuses() {
        return buses;
    }

    public EstimateContactDto getContact() {
        return contact;
    }
}
