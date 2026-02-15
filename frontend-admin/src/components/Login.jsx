import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 검증
    if (!loginId.trim()) {
      setError('ログインIDを入力してください。');
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError('パスワードを入力してください。');
      setLoading(false);
      return;
    }

    try {
      // ★ 백엔드로 로그인 요청
      const response = await axios.post('/admin/login', {
        loginId,
        password,
      });

      const { accessToken, companyName } = response.data;

      // ★ 토큰과 회사명을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('loginId', loginId);

      console.log('ログイン成功:', { accessToken, companyName });

      // ★ 대시보드로 이동
      navigate('/dashboard');
    } catch (error) {
      console.error('ログイン失敗:', error);

      if (error.response?.status === 400 || error.response?.status === 500) {
        setError('ログインIDまたはパスワードが正しくありません。');
      } else {
        setError('ログインに失敗しました。サーバーを確認してください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            管理者ログイン
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* エラーメッセージ */}
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* ログインID */}
            <div>
              <label
                htmlFor="loginId"
                className="block text-sm/6 font-medium text-black"
              >
                ログインID
              </label>
              <div className="mt-2">
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="会社のログインID"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  disabled={loading}
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black"
                >
                  パスワード
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="パスワード"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  disabled={loading}
                />
              </div>
            </div>

            {/* 提出ボタン */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold leading-6 text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
