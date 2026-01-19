import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useBusStore from '../../store/Store';

export default function InputTable1() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [departure, setDeparture] = useState('');
  const [carType, setCarType] = useState('');
  const [carCount, setCarCount] = useState('');
  const [guideRequired, setGuideRequired] = useState(false);

  const navigate = useNavigate();
  const { setFormData } = useBusStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ★ Zustand 스토어에 저장
    setFormData({
      startDate,
      endDate,
      departure,
      carType,
      carCount,
      guideRequired,
    });

    console.log('出発日:', startDate);
    console.log('到着日:', endDate);
    console.log('出発地:', departure);
    console.log('車両タイプ:', carType);
    console.log('車両台数:', carCount);
    console.log('ガイド必要否:', guideRequired ? '필요' : '불필요');
    // ★ 다음으로 넘어가기 전, 부모의 전역 상태를 업데이트합니다.

    navigate('/InputPage2');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <form className="w-full max-w-3xl px-6 py-12" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              日付選択
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              日付を選択してください。
            </p>
            {/* 날짜 입력 */}
            <div className="mt-6 max-w-sm">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                出発日
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
              />

              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                到着日
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
              />
            </div>
            {/* 출발지 */}
            <div className="sm:col-span-3">
              <label
                htmlFor="departure"
                className="block text-sm/6 font-medium text-gray-900"
              >
                出発地
              </label>
              <div className="mt-2 relative">
                <select
                  id="departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="東京">東京</option>
                  <option value="大阪">大阪</option>
                  <option value="京都">京都</option>
                </select>

                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500"
                />
              </div>
            </div>
            {/* 차량 정보 섹션 (Grid 적용) */}
            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 items-end">
              {/* 왼쪽: 차량 타입 선택 */}
              <div className="flex flex-col">
                <label
                  htmlFor="carType"
                  className="block text-sm font-medium text-gray-900"
                >
                  車両
                </label>
                <div className="mt-2 relative">
                  <select
                    id="carType"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full appearance-none rounded-md bg-white h-10 py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="大型">大型</option>
                    <option value="中型">中型</option>
                    <option value="小型">小型</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500"
                  />
                </div>
              </div>

              {/* 오른쪽: 차량 대수 입력 */}
              <div className="flex flex-col">
                <label
                  htmlFor="carCount"
                  className="block text-sm font-medium text-gray-900"
                >
                  車両台数
                </label>
                <div className="mt-2">
                  <input
                    id="carCount"
                    type="number"
                    min="0"
                    value={carCount}
                    onChange={(e) => setCarCount(e.target.value)}
                    className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                    placeholder="例: 3"
                  />
                </div>
              </div>
            </div>
            {/* ★ 3. 단일 버튼 토글 섹션 ★ */}
            <div className="mt-10">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                ガイド
              </label>
              <button
                type="button"
                // 클릭할 때마다 반대값으로 변경 (!false -> true, !true -> false)
                onClick={() => setGuideRequired(!guideRequired)}
                className={`px-6 py-2 rounded-md text-sm font-bold border transition-colors ${
                  guideRequired
                    ? 'bg-indigo-600 text-white border-indigo-600' // 클릭됨 (필요)
                    : 'bg-white text-gray-400 border-gray-300' // 클릭안됨 (불필요)
                }`}
              >
                {guideRequired ? '필요' : '불필요'}
              </button>
              <p className="mt-2 text-xs text-gray-500">
                * 클릭하여 가이드 필요 여부를 선택하세요.
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-white"
          >
            次へ
          </button>
        </div>
      </form>
    </div>
  );
}
