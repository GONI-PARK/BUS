package com.hana.bus.dto.estimate;

public class EstimateContactDto {

    private String nameKanji;
    private String nameKana;
    private String email;
    private String phone;

    private String contactTime;
    private String organizationName;
    private String note;
    private String travelAgencyName;

    public EstimateContactDto() {
    }

    public String getNameKanji() {
        return nameKanji;
    }

    public String getNameKana() {
        return nameKana;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getContactTime() {
        return contactTime;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public String getNote() {
        return note;
    }

    public String getTravelAgencyName() {
        return travelAgencyName;
    }
}
