import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useBusStore from '../../store/Store';

export default function InputTable3() {
  const navigate = useNavigate();
  const { formData, resetForm } = useBusStore();
  const [adultCount, setAdultCount] = useState('');
  const [childCount, setChildCount] = useState('');
  const [routerOrder, setRouterOrder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentForm = new FormData(e.target);
    const selectedTripType = currentForm.get('trip-type');
    const purpose = currentForm.get('purpose');
    const luggageType = currentForm.get('luggage-type');
    const nameKanji = currentForm.get('name-kanji');
    const nameKana = currentForm.get('name-kana');
    const email = currentForm.get('email');
    const phone = currentForm.get('phone');
    const contactTime = currentForm.get('contact-time');
    const organizationName = currentForm.get('organization-name');
    const note = currentForm.get('note');
    const travelAgencyName = currentForm.get('travel-agency-name');
    const detailAddress = currentForm.get('detail-address');
    const routeType = currentForm.get('route-type');
    const routerOrder = currentForm.get('router-order');

    console.log('버스 이용 방식:', selectedTripType);

    // ★ 최종 데이터 구성 (Zustand에 저장된 모든 데이터)
    const finalData = {
      ...formData,
      tripType: selectedTripType,
      adultCount: parseInt(adultCount) || 0,
      childCount: parseInt(childCount) || 0,
      purpose: purpose,
      luggageType: luggageType,
      nameKanji: nameKanji,
      nameKana: nameKana,
      email: email,
      phone: phone,
      contactTime: contactTime,
      organizationName: organizationName,
      note: note,
      travelAgencyName: travelAgencyName,
      detailAddress: detailAddress,
      routeType: routeType,
      routerOrder: routerOrder,
    };

    console.log('전송할 데이터:', finalData);

    // ★ 로컬 검증
    const adultNum = Number(adultCount) || 0;
    const childNum = Number(childCount) || 0;

    if (!adultNum || adultNum < 1) {
      alert('成人数は1名以上である必要があります。');
      return;
    }
    if (childNum < 0) {
      alert('子供数は0人以上である必要があります。');
      return;
    }
    if (!formData.schedule.startDate || !formData.schedule.endDate) {
      alert('出発日と到着日を入力してください。');
      return;
    }

    // ★ 백엔드가 기대하는 중첩 구조로 변환
    const payload = {
      companyId: formData.companyId,

      basic: {
        purpose: purpose || '문의',
        adultCount: adultNum,
        childCount: childNum,
        luggageType: luggageType || 'many',
      },
      schedule: {
        tripType: selectedTripType || 'oneway',
        startDate: formData.schedule.startDate,
        endDate: formData.schedule.endDate,
      },
      routes: [
        {
          routeType: routeType || 'start',
          prefectureCode: '',
          cityName: formData.routes[0]?.cityName || '',
          detailAddress: detailAddress || '',
          routeOrder: 1,
        },
      ],
      buses: formData.buses || [
        {
          busType: '',
          busCount: 0,
        },
      ],
      contact: {
        nameKanji: nameKanji || '',
        nameKana: nameKana || '',
        email: email || '',
        phone: phone || '',
        contactTime: contactTime || '',
        organizationName: organizationName || '',
        note: note || '',
        travelAgencyName: travelAgencyName || '',
      },
    };

    console.log('전송할 payload:', payload);

    try {
      const response = await axios.post('/api/estimates', payload);
      console.log('응답:', response.data);
      alert('成功しました！');
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('제출 실패:', error);
      const msg = error?.response?.data?.message || '提出に失敗しました。';
      alert(msg);
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

            {/* Radio 그룹: Trip Type */}
            <div className="mt-10 flex items-center gap-x-10">
              <div className="flex items-center gap-x-3">
                <input
                  defaultChecked
                  id="one-way"
                  name="trip-type"
                  type="radio"
                  value="oneway"
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
                  value="round"
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

            {/* About textarea */}
            <div className="col-span-full">
              <label
                htmlFor="purpose"
                className="block text-sm/6 font-medium text-gray-900"
              >
                목적
              </label>
              <div className="mt-2">
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* 오른쪽: 차량 대수 입력 */}
            <div className="flex flex-col">
              <label
                htmlFor="adultCount"
                className="block text-sm font-medium text-gray-900"
              >
                大人数
              </label>
              <div className="mt-2">
                <input
                  id="adultCount"
                  type="number"
                  min="0"
                  value={adultCount}
                  onChange={(e) => setAdultCount(e.target.value)}
                  className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                  placeholder="例: 3"
                />
              </div>
            </div>
            {/* 오른쪽: 차량 대수 입력 */}
            <div className="flex flex-col">
              <label
                htmlFor="childCount"
                className="block text-sm font-medium text-gray-900"
              >
                子供数
              </label>
              <div className="mt-2">
                <input
                  id="childCount"
                  type="number"
                  min="0"
                  value={childCount}
                  onChange={(e) => setChildCount(e.target.value)}
                  className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                  placeholder="例: 3"
                />
              </div>
            </div>

            {/* luggage-about textarea */}
            <div className="col-span-full">
              <label
                htmlFor="luggage-type"
                className="block text-sm/6 font-medium text-gray-900"
              >
                荷物について
              </label>
              <div className="mt-2">
                <select
                  id="luggage-type"
                  name="luggage-type"
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm border border-gray-300 focus:outline-indigo-600"
                  defaultValue="many"
                >
                  <option value="many">荷物が多い</option>
                  <option value="hand">手荷物のみ</option>
                </select>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="name-kanji"
                className="block text-sm/6 font-medium text-gray-900"
              >
                名前漢字
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="name-kanji"
                    name="name-kanji"
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="name-kana"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ふりがな
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="name-kana"
                    name="name-kana"
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* 連絡希望時間 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="contact-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                連絡希望時間
              </label>
              <div className="mt-2">
                <textarea
                  id="contact-time"
                  name="contact-time"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* 団体名 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="organization-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                団体名
              </label>
              <div className="mt-2">
                <textarea
                  id="organization-name"
                  name="organization-name"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* 連絡事項 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="note"
                className="block text-sm/6 font-medium text-gray-900"
              >
                連絡事項
              </label>
              <div className="mt-2">
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* 旅行会社 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="travel-agency-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                旅行会社の方は会社の名前をご記入ください
              </label>
              <div className="mt-2">
                <textarea
                  id="travel-agency-name"
                  name="travel-agency-name"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* 詳細住所 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="detail-address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                詳細住所
              </label>
              <div className="mt-2">
                <textarea
                  id="detail-address"
                  name="detail-address"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>

            {/* routeType */}
            <div className="col-span-full">
              <label
                htmlFor="route-type"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ルートタイプ
              </label>

              <div className="mt-2">
                <select
                  id="route-type"
                  name="route-type"
                  className="block w-full rounded-md border px-3 py-2"
                  required
                >
                  <option value="departure">출발</option>
                  <option value="stopover">경유</option>
                  <option value="arrival">도착</option>
                </select>
              </div>
            </div>

            {/* routerOrder */}
            <div className="flex flex-col">
              <label
                htmlFor="router-order"
                className="block text-sm font-medium text-gray-900"
              >
                ルーターオーダー, '이거 삭제할지 고민해야한다..'
              </label>
              <div className="mt-2">
                <input
                  id="router-order"
                  type="number"
                  min="0"
                  value={routerOrder}
                  onChange={(e) => setRouterOrder(e.target.value)}
                  className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                  placeholder="例: 3"
                />
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
