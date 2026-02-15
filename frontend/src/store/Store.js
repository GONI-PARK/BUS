import { create } from 'zustand';

const useBusStore = create((set) => ({
  // 1. 모든 페이지 데이터를 담을 그릇
  formData: {
    companyId: null,

    basic: {
      purpose: '',
      adultCount: 0,
      childCount: 0,
      luggageType: '',
    },

    schedule: {
      tripType: '',
      startDate: '',
      endDate: '',
    },

    routes: [
      {
        routeType: '',
        prefectureCode: '',
        cityName: '',
        detailAddress: '',
        routerOrder: 0,
      },
    ],

    buses: [
      {
        busType: '',
        busCount: 0,
      },
    ],

    contact: {
      nameKanji: '',
      nameKana: '',
      email: '',
      phone: '',
      contactTime: '',
      organizationName: '',
      note: '',
      travelAgencyName: '',
    },
  },

  // ★ 특정 섹션 업데이트 (중첩 객체 안전하게 업데이트)
  setBasic: (basicData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        basic: { ...state.formData.basic, ...basicData },
      },
    })),

  setSchedule: (scheduleData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        schedule: { ...state.formData.schedule, ...scheduleData },
      },
    })),

  setRoutes: (routes) =>
    set((state) => ({
      formData: {
        ...state.formData,
        routes,
      },
    })),

  setBuses: (buses) =>
    set((state) => ({
      formData: {
        ...state.formData,
        buses,
      },
    })),

  setContact: (contactData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        contact: { ...state.formData.contact, ...contactData },
      },
    })),

  setCompanyId: (companyId) =>
    set((state) => ({
      formData: {
        ...state.formData,
        companyId,
      },
    })),

  // ★ 전체 폼 초기화
  resetForm: () =>
    set({
      formData: {
        companyId: null,
        basic: {
          purpose: '',
          adultCount: 0,
          childCount: 0,
          luggageType: '',
        },
        schedule: {
          tripType: '',
          startDate: '',
          endDate: '',
        },
        routes: [
          {
            routeType: '',
            prefectureCode: '',
            cityName: '',
            detailAddress: '',
            routerOrder: 0,
          },
        ],
        buses: [
          {
            busType: '',
            busCount: 0,
          },
        ],
        contact: {
          nameKanji: '',
          nameKana: '',
          email: '',
          phone: '',
          contactTime: '',
          organizationName: '',
          note: '',
          travelAgencyName: '',
        },
      },
    }),
}));

export default useBusStore;
