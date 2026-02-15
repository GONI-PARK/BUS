package com.hana.bus.search;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor   
@ToString
public class SearchCompanyDTO {

    
    private Long companyId;
    private String companyName;      
    private String busType;           
    private LocalDate targetDate; 
}
