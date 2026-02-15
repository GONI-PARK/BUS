import { useState } from 'react';
import axios from 'axios';

export default function BusManagementView() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchSchedules = async () => {
    if (!fromDate || !toDate) {
      alert('시작일과 종료일을 모두 선택해주세요.');
      return;
    }

    if (fromDate > toDate) {
      alert('시작일은 종료일보다 클 수 없습니다.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // ★ 토큰 가져오기 ('accessToken' 키 확인)
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('ログインしてください。');
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return;
      }

      console.log('토큰:', token.substring(0, 20) + '...'); // 디버깅용
      console.log('요청 파라미터:', { from: fromDate, to: toDate });

      // ★ 프록시 사용 (vite.config.js 설정되어 있으면)
      const response = await axios.get('/admin/bus-schedules', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          from: fromDate,
          to: toDate,
        },
      });

      console.log('응답:', response.data);
      setSchedules(response.data);
    } catch (err) {
      console.error('전체 에러:', err);
      console.error('에러 상태:', err.response?.status);
      console.error('에러 메시지:', err.response?.data);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('인증에 실패했습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('companyName');
        window.location.href = '/login';
      } else if (err.response?.status === 400) {
        setError('날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)');
      } else {
        setError(`버스 스케줄 조회 실패: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-3xl mb-6 font-bold text-gray-900">
        バススケジュール管理
      </h2>

      {/* 검색 영역 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex items-end gap-6 flex-wrap">
        {/* 시작일 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            開始日
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-indigo-600"
          />
        </div>

        {/* 종료일 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            終了日
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-indigo-600"
          />
        </div>

        {/* 조회 버튼 */}
        <button
          onClick={handleFetchSchedules}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400 font-semibold"
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </div>

      {/* 로딩 */}
      {loading && (
        <p className="text-gray-600 mb-4 text-center">読み込み中...</p>
      )}

      {/* 에러 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 결과 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                日付
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                バスタイプ
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                最大台数
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {schedules.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500 text-sm"
                >
                  データが見つかりません
                </td>
              </tr>
            )}

            {schedules.map((schedule) => (
              <tr
                key={
                  schedule.id ?? `${schedule.targetDate}-${schedule.busType}`
                }
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {schedule.targetDate}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {schedule.busType}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {schedule.maxCount}台
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {schedule.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {schedules.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t text-sm text-gray-600">
            合計: <strong>{schedules.length}</strong>件
          </div>
        )}
      </div>
    </div>
  );
}
