import { create } from 'zustand';

const useBusStore = create((set) => ({
  // 1. 모든 페이지 데이터를 담을 그릇
  formData: {
    // Step 1 - InputTable1
    startDate: '',
    endDate: '',
    departure: '',
    carType: '',
    carCount: '',
    guideRequired: false,

    // Step 2 - InputTable2
    selectedBuses: [],

    // Step 3 - InputTable3
    tripType: '편도',
  },

  // 2. 데이터를 업데이트하는 액션
  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  // 4. 전체 폼 초기화
  resetForm: () =>
    set({
      formData: {
        startDate: '',
        endDate: '',
        departure: '',
        carType: '',
        carCount: '',
        guideRequired: false,
        selectedBuses: [],
        tripType: '편도',
      },
    }),
}));

export default useBusStore;
