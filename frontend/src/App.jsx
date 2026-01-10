import './App.css';
import Home from './pages/Home';
import Input1 from './pages/Input1';
import Input2 from './pages/Input2';
import Input3 from './pages/Input3';
import Notfound from './pages/Notfound';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/Input1" element={<Input1 />} />
        <Route path="/Input2" element={<Input2 />} />
        <Route path="/Input3" element={<Input3 />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
