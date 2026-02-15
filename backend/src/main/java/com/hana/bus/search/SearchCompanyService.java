package com.hana.bus.search;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SearchCompanyService {

    private final SearchCompanyRepository searchCompanyRepository;

    public SearchCompanyService(SearchCompanyRepository searchCompanyRepository) {
        this.searchCompanyRepository = searchCompanyRepository;
    }

    public List<SearchCompanyEntity> search(
        String busType,
        LocalDate startDate,
        LocalDate endDate
    ) {

        return searchCompanyRepository
            .findByBusTypeAndTargetDateBetween(
                busType,
                startDate,
                endDate
            );
    }
}
