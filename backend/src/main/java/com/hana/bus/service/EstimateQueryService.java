package com.hana.bus.service;

import com.hana.bus.dto.estimate.EstimateListItemDto;
import com.hana.bus.dto.estimate.response.EstimateDetailResponse;
import com.hana.bus.entity.Estimate;
import com.hana.bus.entity.EstimateBusRequest;
import com.hana.bus.entity.EstimateContact;
import com.hana.bus.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class EstimateQueryService {

    private final EstimateRepository estimateRepository;
    private final EstimateScheduleRepository scheduleRepository;
    private final EstimateRouteRepository routeRepository;
    private final EstimateBusRequestRepository busRequestRepository;
    private final EstimateContactRepository contactRepository;

    public EstimateQueryService(
            EstimateRepository estimateRepository,
            EstimateScheduleRepository scheduleRepository,
            EstimateRouteRepository routeRepository,
            EstimateBusRequestRepository busRepository,
            EstimateContactRepository contactRepository) {

        this.estimateRepository = estimateRepository;
        this.scheduleRepository = scheduleRepository;
        this.routeRepository = routeRepository;
        this.busRequestRepository = busRepository;
        this.contactRepository = contactRepository;
    }

    public EstimateDetailResponse getDetail(Long estimateId) {

        Estimate estimate = estimateRepository.findById(estimateId)
                .orElseThrow(() -> new IllegalArgumentException("견적이 존재하지 않습니다."));

        return EstimateDetailResponse.from(
                estimate,
                scheduleRepository.findByEstimateId(estimateId).orElse(null),
                routeRepository.findByEstimateIdOrderByRouteOrderAsc(estimateId),
                busRequestRepository.findByEstimateId(estimateId),
                contactRepository.findByEstimateId(estimateId).orElse(null)
        );
    }
    
    @Transactional(readOnly = true)
    public List<EstimateListItemDto> getList(
            LocalDate fromDate,
            LocalDate toDate
    ) {
        LocalDateTime from = fromDate.atStartOfDay();
        LocalDateTime to = toDate.atTime(23, 59, 59);

        List<Estimate> estimates =
                estimateRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(from, to);

        return estimates.stream().map(estimate -> {

            EstimateContact contact =
                    contactRepository.findByEstimateId(estimate.getId()).orElse(null);

            EstimateBusRequest bus =
            		busRequestRepository.findByEstimateId(estimate.getId())
                            .stream()
                            .findFirst()
                            .orElse(null);

            return new EstimateListItemDto(
                    estimate.getId(),
                    estimate.getCreatedAt(),
                    "버스 회사명 ", // ← 아직 버스 회사명은 없음; 
                    bus != null ? bus.getBusType() : null,
                    contact != null ? contact.getNameKanji() : null,
                    contact != null ? contact.getPhone() : null,
                    contact != null ? contact.getEmail() : null
            );
        }).toList();
    }
}
