package com.hana.bus.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hana.bus.dto.estimate.EstimateBasicDto;
import com.hana.bus.dto.estimate.EstimateContactDto;
import com.hana.bus.dto.estimate.EstimateCreateRequestDto;
import com.hana.bus.dto.estimate.EstimateListItemDto;
import com.hana.bus.entity.Estimate;
import com.hana.bus.entity.EstimateBusRequest;
import com.hana.bus.entity.EstimateContact;
import com.hana.bus.entity.EstimateRoute;
import com.hana.bus.entity.EstimateSchedule;
import com.hana.bus.repository.EstimateBusRequestRepository;
import com.hana.bus.repository.EstimateContactRepository;
import com.hana.bus.repository.EstimateRepository;
import com.hana.bus.repository.EstimateRouteRepository;
import com.hana.bus.repository.EstimateScheduleRepository;

@Service
public class EstimateService {

    private final EstimateRepository estimateRepository;
    private final EstimateScheduleRepository scheduleRepository;
    private final EstimateRouteRepository routeRepository;
    private final EstimateBusRequestRepository busRequestRepository;
    private final EstimateContactRepository contactRepository;

    public EstimateService(
            EstimateRepository estimateRepository,
            EstimateScheduleRepository scheduleRepository,
            EstimateRouteRepository routeRepository,
            EstimateBusRequestRepository busRequestRepository,
            EstimateContactRepository contactRepository) {

        this.estimateRepository = estimateRepository;
        this.scheduleRepository = scheduleRepository;
        this.routeRepository = routeRepository;
        this.busRequestRepository = busRequestRepository;
        this.contactRepository = contactRepository;
    }

    @Transactional
    public void create(EstimateCreateRequestDto requestDto) {

    	validateBasic(requestDto.getBasic());
    	
        Estimate savedEstimate = estimateRepository.save(
                new Estimate(
                        requestDto.getBasic().getPurpose(),
                        requestDto.getBasic().getAdultCount(),
                        requestDto.getBasic().getChildCount(),
                        requestDto.getBasic().getLuggageType()
                )
        );

        scheduleRepository.save(
                new EstimateSchedule(
                        savedEstimate,
                        requestDto.getSchedule().getTripType(),
                        LocalDate.parse(requestDto.getSchedule().getStartDate()),
                        LocalDate.parse(requestDto.getSchedule().getEndDate())
                )
        );

        requestDto.getRoutes().forEach(routeDto ->
                routeRepository.save(
                        new EstimateRoute(
                                savedEstimate,
                                routeDto.getRouteType(),
                                routeDto.getPrefectureCode(),
                                routeDto.getCityName(),
                                routeDto.getDetailAddress(),
                                routeDto.getRouteOrder()
                        )
                )
        );

        requestDto.getBuses().forEach(busRequestDto ->
                busRequestRepository.save(
                        new EstimateBusRequest(
                                savedEstimate,
                                busRequestDto.getBusType(),
                                busRequestDto.getBusCount()
                        )
                )
        );

        EstimateContactDto contactDto = requestDto.getContact();
        contactRepository.save(
                new EstimateContact(
                        savedEstimate,
                        contactDto.getNameKanji(),
                        contactDto.getNameKana(),
                        contactDto.getEmail(),
                        contactDto.getPhone(),
                        contactDto.getContactTime(),
                        contactDto.getOrganizationName(),
                        contactDto.getNote(),
                        contactDto.getTravelAgencyName()
                )
        );
    }
    
    private void validateBasic(EstimateBasicDto basic) {

        if (basic.getAdultCount() == null || basic.getAdultCount() <= 0) {
            throw new IllegalArgumentException("성인 수는 1명 이상이어야 합니다.");
        }

        if (basic.getChildCount() == null || basic.getChildCount() < 0) {
            throw new IllegalArgumentException("아이 수는 0명 이상이어야 합니다.");
        }
    }


}
