import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useBusStore from '../../store/Store';

export default function InputTable3() {
  const navigate = useNavigate();
  const { formData, resetForm } = useBusStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentForm = new FormData(e.target);
    const selectedTripType = currentForm.get('trip-type');

    console.log('버스 이용 방식:', selectedTripType);

    // ★ 최종 데이터 구성 (Zustand에 저장된 모든 데이터)
    const finalData = {
      ...formData,
      tripType: selectedTripType,
    };

    console.log('전송할 데이터:', finalData);

    try {
      // ★ 백엔드로 전송
      const response = await axios.post('/api/bus-booking', finalData);

      console.log('응답:', response.data);
      alert('성공적으로 제출되었습니다!');

      // ★ 제출 후 스토어 초기화
      resetForm();

      navigate('/');
    } catch (error) {
      console.error('제출 실패:', error);
      alert('제출에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl px-6 py-12">
        <div className="space-y-12">
          {/* Push Notifications 섹션만 유지 */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              버스의 이용
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              이용 방식을 선택해 주세요.
            </p>

            <div className="mt-10 flex items-center gap-x-10">
              <div className="flex items-center gap-x-3">
                <input
                  defaultChecked
                  id="one-way"
                  name="trip-type"
                  type="radio"
                  value="편도"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                />
                <label
                  htmlFor="one-way"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  편도
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="round-trip"
                  name="trip-type"
                  type="radio"
                  value="왕복"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                />
                <label
                  htmlFor="round-trip"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  왕복
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(-1)} // 뒤로 가기 기능
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            次へ
          </button>
        </div>
      </form>
    </div>
  );
}
