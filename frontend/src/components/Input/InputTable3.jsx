import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useBusStore from '../../store/Store';

export default function InputTable3() {
  const navigate = useNavigate();
  const { formData, resetForm } = useBusStore();
  const [adultCount, setAdultCount] = useState('');
  const [kidsCount, setKidsCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentForm = new FormData(e.target);
    const selectedTripType = currentForm.get('trip-type');
    const about = currentForm.get('about');
    const luggageSize = currentForm.get('luggage-size');
    const luggageAbout = currentForm.get('luggage-about');
    const username = currentForm.get('username');
    const furiganaName = currentForm.get('furigana-name');
    const email = currentForm.get('email');
    const phone = currentForm.get('phone');
    const desiredTime = currentForm.get('desired-time');
    const desiredTimeRadio = currentForm.get('desired-time-radio');
    const groupName = currentForm.get('group-name');
    const contactNotes = currentForm.get('contact-notes');
    const travelCompany = currentForm.get('travel-company');

    console.log('버스 이용 방식:', selectedTripType);

    // ★ 최종 데이터 구성 (Zustand에 저장된 모든 데이터)
    const finalData = {
      ...formData,
      tripType: selectedTripType,
      adultCount: parseInt(adultCount) || 0,
      kidsCount: parseInt(kidsCount) || 0,
      about: about,
      luggageSize: luggageSize,
      luggageAbout: luggageAbout,
      username: username,
      furiganaName: furiganaName,
      email: email,
      phone: phone,
      desiredTime: desiredTime,
      desiredTimeRadio: desiredTimeRadio,
      groupName: groupName,
      contactNotes: contactNotes,
      travelCompany: travelCompany,
    };

    console.log('전송할 데이터:', finalData);

    try {
      // ★ 백엔드로 전송
      const response = await axios.post('/api/estimates', finalData);

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

            {/* Radio 그룹: Trip Type */}
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

            {/* About textarea */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
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
                htmlFor="kidsCount"
                className="block text-sm font-medium text-gray-900"
              >
                子供数
              </label>
              <div className="mt-2">
                <input
                  id="kidsCount"
                  type="number"
                  min="0"
                  value={kidsCount}
                  onChange={(e) => setKidsCount(e.target.value)}
                  className="h-10 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-indigo-600 sm:text-sm"
                  placeholder="例: 3"
                />
              </div>
            </div>

            {/* 수하물 그룹: Trip Type */}
            <div className="mt-10 flex items-center gap-x-10">
              <div className="flex items-center gap-x-3">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  荷物の量
                </h2>
                <input
                  defaultChecked
                  id="big-luggage"
                  name="luggage-size"
                  type="radio"
                  value="多い"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                />
                <label
                  htmlFor="big-luggage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  多い
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="small-luggage"
                  name="luggage-size"
                  type="radio"
                  value="手荷物程度"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                />
                <label
                  htmlFor="small-luggage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  手荷物程度
                </label>
              </div>
            </div>

            {/* luggage-about textarea */}
            <div className="col-span-full">
              <label
                htmlFor="luggage-about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                荷物について
              </label>
              <div className="mt-2">
                <textarea
                  id="luggage-about"
                  name="luggage-about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                名前漢字
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="furigana-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ふりがな
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="furigana-name"
                    name="furigana-name"
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
                htmlFor="desired-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                連絡希望時間
              </label>
              <div className="mt-2">
                <textarea
                  id="desired-time"
                  name="desired-time"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="desired-time-radio"
                name="desired-time-radio"
                type="radio"
                value="特になし"
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
              />
              <label
                htmlFor="desired-time-radio"
                className="block text-sm/6 font-medium text-gray-900"
              >
                特になし
              </label>
            </div>
            {/* 団体名 textarea */}
            <div className="col-span-full">
              <label
                htmlFor="group-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                団体名
              </label>
              <div className="mt-2">
                <textarea
                  id="group-name"
                  name="group-name"
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
                htmlFor="contact-notes"
                className="block text-sm/6 font-medium text-gray-900"
              >
                連絡事項
              </label>
              <div className="mt-2">
                <textarea
                  id="contact-notes"
                  name="contact-notes"
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
                htmlFor="travel-company"
                className="block text-sm/6 font-medium text-gray-900"
              >
                旅行会社の方は会社の名前をご記入ください
              </label>
              <div className="mt-2">
                <textarea
                  id="travel-company"
                  name="travel-company"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
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
