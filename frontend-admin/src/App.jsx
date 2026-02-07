import './App.css';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/DashBoard';
import BusManagement from './pages/BusManagement';
import Quotes from './pages/Quotes';
import SideBar from './components/Layout/SideBar';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<SideBar />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/bus-management" element={<BusManagement />} />
        <Route path="/quotes" element={<Quotes />} />
      </Route>
    </Routes>
  );
}

export default App;
