import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useBusStore from '../../store/Store';

const PREFECTURE_MAP = {
  東京: 13,
  大阪: 27,
  京都: 26,
};

export default function InputTable1() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cityName, setCityName] = useState('');
  const [prefectureCode, setPrefectureCode] = useState('');
  const [busType, setBusType] = useState('');
  const [busCount, setBusCount] = useState('');

  const navigate = useNavigate();
  const { setSchedule, setRoutes, setBuses } = useBusStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ★ Zustand 스토어에 저장
    // schedule DTO
    setSchedule({
      startDate,
      endDate,
    });

    // routes DTO
    setRoutes([
      {
        cityName: cityName,
        prefectureCode,
      },
    ]);

    // buses DTO
    setBuses([
      {
        busType,
        busCount: Number(busCount),
      },
    ]);

    console.log('出発日:', startDate);
    console.log('到着日:', endDate);
    console.log('出発地:', cityName);
    console.log('都道府県コード:', prefectureCode);
    console.log('車両タイプ:', busType);
    console.log('車両台数:', busCount);

    // ★ 다음으로 넘어가기 전, 부모의 전역 상태를 업데이트합니다.

    navigate('/InputPage2');
  };

  const handleCityChange = (selectedCity) => {
    setCityName(selectedCity);
    setPrefectureCode(PREFECTURE_MAP[selectedCity] || '');
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

            <div className="mt-6 max-w-sm">
              <label
                htmlFor="startDate"
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
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-900 mt-4"
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

            <div className="sm:col-span-3 mt-6">
              <label
                htmlFor="cityName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                出発地
              </label>
              <div className="mt-2 relative">
                <select
                  id="cityName"
                  value={cityName}
                  onChange={(e) => handleCityChange(e.target.value)}
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

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 items-end">
              <div className="flex flex-col">
                <label
                  htmlFor="busType"
                  className="block text-sm font-medium text-gray-900"
                >
                  車両
                </label>
                <div className="mt-2 relative">
                  <select
                    id="busType"
                    value={busType}
                    onChange={(e) => setBusType(e.target.value)}
                    className="w-full appearance-none rounded-md bg-white h-10 py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="large">大型</option>
                    <option value="medium">中型</option>
                    <option value="small">小型</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="busCount"
                  className="block text-sm font-medium text-gray-900"
                >
                  車両台数
                </label>
                <div className="mt-2">
                  <input
                    id="busCount"
                    type="number"
                    min="1"
                    value={busCount}
                    onChange={(e) => setBusCount(e.target.value)}
                    className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                    placeholder="例: 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-white font-semibold hover:bg-indigo-500"
          >
            次へ
          </button>
        </div>
      </form>
    </div>
  );
}
