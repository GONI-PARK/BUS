package com.hana.bus.search;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/bus-schedules/search")
public class SearchCompanyController {

    
    private final SearchCompanyService searchCompanyService;
    
    public SearchCompanyController(
        SearchCompanyService searchCompanyService
    ) {
        this.searchCompanyService = searchCompanyService;
    }

    @GetMapping
    public List<SearchCompanyDTO> search(
        
        @RequestParam("startDate") LocalDate startDate,
        @RequestParam("endDate") LocalDate endDate,
        @RequestParam("busType") String busType
    ) {
        return searchCompanyService
            .search(busType, startDate, endDate)
            .stream()
            .map(entity -> new SearchCompanyDTO(
                entity.getCompanyId(),
                entity.getCompanyName(),
                entity.getBusType(),
                entity.getTargetDate()
            ))
            .toList();
    }
}

