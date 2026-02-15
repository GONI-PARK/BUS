import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useBusStore from '../../store/Store';

export default function InputTable2() {
  const navigate = useNavigate();

  // ✅ Zustand에서 데이터 가져오기
  const { formData, setCompanyId } = useBusStore();

  const startDate = formData.schedule.startDate;
  const endDate = formData.schedule.endDate;
  const busType = formData.buses[0]?.busType;

  // ✅ 회사 목록 상태
  const [companies, setCompanies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ 페이지 진입 시 자동 검색
  useEffect(() => {
    if (!startDate || !endDate || !busType) {
      console.warn('검색 조건 부족');
      return;
    }

    fetchCompanies();
  }, [startDate, endDate, busType]);

  // ✅ API 호출
  const fetchCompanies = async () => {
    try {
      setLoading(true);

      console.log('검색조건:', {
        startDate,
        endDate,
        busType,
      });

      const res = await axios.get(
        'http://localhost:8080/admin/bus-schedules/search',
        {
          params: {
            startDate,
            endDate,
            busType,
          },
        },
      );

      console.log('서버 응답:', res.data);

      setCompanies(res.data);
    } catch (err) {
      console.error(err);
      alert('회사 목록 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 회사 선택
  const selectCompany = (id) => {
    setSelectedId(id);
  };

  // ✅ 다음 단계
  const handleConfirmSelection = () => {
    if (!selectedId) {
      alert('회사를 선택해주세요!');
      return;
    }

    setCompanyId(selectedId);

    console.log('선택된 회사 ID:', selectedId);

    navigate('/InputPage3');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* 제목 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">バス会社を選択</h2>
          <p className="mt-1 text-sm text-gray-500">
            希望する会社を選択してください。
          </p>
        </div>

        {/* 테이블 */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  会社名
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  選択
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {/* 로딩 */}
              {loading && (
                <tr>
                  <td colSpan="2" className="text-center py-6 text-gray-500">
                    불러오는 중...
                  </td>
                </tr>
              )}

              {/* 데이터 없음 */}
              {!loading && companies.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center py-6 text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}

              {/* 결과 출력 */}

              {companies.map((company) => (
                <tr
                  key={company.companyId}
                  onClick={() => selectCompany(company.companyId)}
                  className={`cursor-pointer transition ${
                    selectedId === company.companyId
                      ? 'bg-indigo-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {company.companyName}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <input
                      type="radio"
                      name="company"
                      checked={selectedId === company.companyId}
                      onChange={() => selectCompany(company.companyId)}
                      className="h-4 w-4 text-indigo-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex justify-end gap-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 border rounded text-gray-700"
          >
            戻る
          </button>

          <button
            onClick={handleConfirmSelection}
            disabled={!selectedId}
            className={`px-6 py-2 rounded text-white font-semibold ${
              selectedId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300'
            }`}
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}
