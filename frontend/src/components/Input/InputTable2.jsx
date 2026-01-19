import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBusStore from '../../store/Store';

export default function InputTable2() {
  const navigate = useNavigate();
  const { setFormData } = useBusStore();

  // 1. 버스 회사 목록
  const busCompanies = [
    { id: 1, name: 'A-Bus 투어' },
    { id: 2, name: 'B-네트워크' },
    { id: 3, name: 'C-리무진 서비스' },
    { id: 4, name: 'D-그린 트래블' },
  ];

  // 2. 선택된 회사 ID들을 배열로 관리 (중복 선택용)
  const [selectedIds, setSelectedIds] = useState([]);

  // 3. 체크박스 토글 함수
  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      // 이미 선택되어 있다면 제거
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // 선택되어 있지 않다면 추가
      setSelectedIds([...selectedIds, id]);
    }
  };

  // 4. 전송 버튼 클릭 시 실행될 함수
  const handleConfirmSelection = () => {
    if (selectedIds.length === 0) {
      alert('최소 하나 이상의 회사를 선택해 주세요!');
      return;
    }

    // 선택된 ID들에 해당하는 회사 객체들 필터링
    const selectedData = busCompanies.filter((c) => selectedIds.includes(c.id));
    const selectedNames = selectedData.map((c) => c.name);

    setFormData({
      selectedBuses: selectedNames,
    });

    console.log(selectedNames); // 배열 형태로 로그 출력

    navigate('/InputPage3');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            버스 회사 중복 선택
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            원하는 회사를 모두 체크해 주세요.
          </p>
        </div>

        {/* 테이블 섹션 */}
        <div className="bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  회사명
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  선택
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {busCompanies.map((company) => (
                <tr
                  key={company.id}
                  onClick={() => toggleSelection(company.id)} // 행 클릭 시 토글
                  className={`cursor-pointer transition-colors ${
                    selectedIds.includes(company.id)
                      ? 'bg-indigo-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <input
                      type="checkbox" // ★ 라디오에서 체크박스로 변경
                      checked={selectedIds.includes(company.id)}
                      onChange={() => toggleSelection(company.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 하단 전송 버튼 영역 */}
        <div className="mt-8 flex justify-end items-center gap-x-6">
          <div className="mt-8 flex justify-end items-center gap-x-4">
            <span className="text-sm text-gray-500">
              선택된 항목: <strong>{selectedIds.length}</strong>개
            </span>

            <button
              type="button"
              onClick={() => window.history.back()} // 브라우저 이전 페이지로 이동 (또는 props.onPrev 호출)
              className="px-6 py-2 rounded-md text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all"
            >
              戻る
            </button>
            <button
              onClick={handleConfirmSelection}
              className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                selectedIds.length > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
