import { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuotesFunction() {
  const [estimates, setEstimates] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 날짜 필터
  const [fromDate, setFromDate] = useState(getFirstDayOfMonth());
  const [toDate, setToDate] = useState(getLastDayOfMonth());

  // ★ 월의 첫 날 구하기
  function getFirstDayOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
  }

  // ★ 월의 마지막 날 구하기
  function getLastDayOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];
  }

  // ★ 견적 목록 조회
  const fetchEstimates = async () => {
    setLoading(true);
    setError('');
    setSelectedEstimate(null);

    try {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기

      const response = await axios.get(
        'http://localhost:8080/admin/estimates',
        {
          params: { fromDate, toDate },
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 포함
          },
        },
      );

      setEstimates(response.data);
    } catch (err) {
      console.error('見積一覧取得失敗:', err);

      if (err.response?.status === 401) {
        setError('認証に失敗しました。ログインしてください。');
      } else if (err.response?.status === 400) {
        setError('日付形式が正しくありません。');
      } else {
        setError('見積一覧の取得に失敗しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  // ★ 견적 상세 조회
  const fetchEstimateDetail = async (estimateId) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기

      const response = await axios.get(
        `http://localhost:8080/admin/estimates/${estimateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 포함
          },
        },
      );

      setSelectedEstimate(response.data);
    } catch (err) {
      console.error('見積詳細取得失敗:', err);

      if (err.response?.status === 401) {
        setError('認証に失敗しました。ログインしてください。');
      } else if (err.response?.status === 404) {
        setError('見積が見つかりません。');
      } else {
        setError('見積詳細の取得に失敗しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  // ★ 페이지 로드 시 목록 조회
  useEffect(() => {
    fetchEstimates();
  }, []);

  return (
    <div className="w-full">
      {/* 날짜 필터 */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              開始日
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              終了日
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-indigo-600"
            />
          </div>

          <button
            onClick={fetchEstimates}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 font-semibold"
          >
            {loading ? '検索中...' : '検索'}
          </button>
        </div>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ★ 見積一覧 (左側) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                見積一覧 ({estimates.length}件)
              </h2>
            </div>

            <div className="divide-y max-h-96 overflow-y-auto">
              {estimates.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  見積がありません
                </div>
              ) : (
                estimates.map((estimate) => (
                  <div
                    key={estimate.estimateId}
                    onClick={() => fetchEstimateDetail(estimate.estimateId)}
                    className={`p-4 cursor-pointer hover:bg-indigo-50 transition-colors ${
                      selectedEstimate?.id === estimate.estimateId
                        ? 'bg-indigo-100 border-l-4 border-indigo-600'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {estimate.customerName || '不明'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ID: {estimate.estimateId}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {estimate.busType || '-'} バス
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(estimate.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ★ 見積詳細 (右側) */}
        <div className="lg:col-span-2">
          {selectedEstimate ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  見積詳細 (ID: {selectedEstimate.id})
                </h2>
                <button
                  onClick={() => setSelectedEstimate(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* 基本情報 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                    基本情報
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">目的</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.basic?.purpose || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">成人数</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.basic?.adultCount || 0}名
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">子供数</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.basic?.childCount || 0}名
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">荷物</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.basic?.luggageType || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 日程 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                    日程
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">出発日</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.schedule?.startDate || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">到着日</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.schedule?.endDate || '-'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">旅行タイプ</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.schedule?.tripType === 'oneway'
                          ? '片道'
                          : '往復'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ルート */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                    ルート
                  </h3>
                  {selectedEstimate.routes &&
                  selectedEstimate.routes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEstimate.routes.map((route, idx) => (
                        <div
                          key={idx}
                          className="text-sm bg-gray-50 p-2 rounded"
                        >
                          <p>
                            <span className="font-medium">
                              {route.routeType}:
                            </span>{' '}
                            {route.cityName} {route.detailAddress}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">ルート情報なし</p>
                  )}
                </div>

                {/* バス要求 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                    バス要求
                  </h3>
                  {selectedEstimate.buses &&
                  selectedEstimate.buses.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEstimate.buses.map((bus, idx) => (
                        <div
                          key={idx}
                          className="text-sm bg-gray-50 p-2 rounded"
                        >
                          <p>
                            <span className="font-medium">{bus.busType}:</span>{' '}
                            {bus.busCount}台
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">バス情報なし</p>
                  )}
                </div>

                {/* 連絡先 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
                    連絡先
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">名前 (漢字)</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.contact?.nameKanji || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">名前 (フリガナ)</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.contact?.nameKana || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">メール</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.contact?.email || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">電話</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEstimate.contact?.phone || '-'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">備考</p>
                      <p className="text-sm text-gray-900">
                        {selectedEstimate.contact?.note || '-'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">団体名</p>
                      <p className="text-sm text-gray-900">
                        {selectedEstimate.contact?.organizationName || '-'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">旅行会社</p>
                      <p className="text-sm text-gray-900">
                        {selectedEstimate.contact?.travelAgencyName || '-'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">連絡希望時間</p>
                      <p className="text-sm text-gray-900">
                        {selectedEstimate.contact?.contactTime || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              左から見積を選択してください
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
