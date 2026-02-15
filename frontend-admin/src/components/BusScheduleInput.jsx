import { useState } from 'react';
import axios from 'axios';

export default function BusScheduleInput() {
  const [date, setDate] = useState('');
  const [busType, setBusType] = useState('');
  const [maxCount, setMaxCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setMessage('로그인 후 등록하세요.');
      return;
    }

    try {
      await axios.put(
        'http://localhost:8080/admin/bus-schedules',
        { date, busType, maxCount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage('버스 스케줄 등록 성공!');
      setDate('');
      setBusType('');
      setMaxCount(0);
    } catch (err) {
      console.error(err);
      setMessage(
        '버스 스케줄 등록 실패: ' + err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label>날짜:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>버스 타입:</label>
        <input
          type="text"
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>최대 운행 수:</label>
        <input
          type="number"
          value={maxCount}
          onChange={(e) => setMaxCount(parseInt(e.target.value))}
          min={0}
          required
        />
      </div>
      <button type="submit">등록</button>
      {message && <p>{message}</p>}
    </form>
  );
}
