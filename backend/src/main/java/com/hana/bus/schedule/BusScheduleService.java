package com.hana.bus.schedule;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusScheduleService {

    private final BusScheduleCapacityRepository repository;

    public BusScheduleService(BusScheduleCapacityRepository repository) {
        this.repository = repository;
    }

    /**
     * 날짜 + 버스타입 기준으로
     * 가용 대수를 등록하거나 수정한다 (UPSERT)
     */
    @Transactional
    public void upsertSchedule(
        Long companyId,
        LocalDate targetDate,
        String busType,
        int maxCount
    ) {
        if (maxCount < 0) {
            throw new IllegalArgumentException(
                "가용 대수는 0 이상이어야 합니다."
            );
        }

        Optional<BusScheduleCapacity> optional =
            repository.findByCompanyIdAndTargetDateAndBusType(
                companyId, targetDate, busType
            );

        if (optional.isPresent()) {
            // 기존 데이터 있으면 UPDATE
            BusScheduleCapacity capacity = optional.get();
            capacity.updateMaxCount(maxCount);
        } else {
            // 없으면 INSERT
            BusScheduleCapacity capacity =
                new BusScheduleCapacity(
                    companyId,
                    targetDate,
                    busType,
                    maxCount
                );
            repository.save(capacity);
        }
    }
}
