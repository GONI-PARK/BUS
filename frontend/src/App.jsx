import './App.css';
import Home from './pages/Home';
import InputPage1 from './pages/InputPage1';
import InputPage2 from './pages/InputPage2';
import InputPage3 from './pages/InputPage3';
import Notfound from './pages/Notfound';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/InputPage1" element={<InputPage1 />} />
        <Route path="/InputPage2" element={<InputPage2 />} />
        <Route path="/InputPage3" element={<InputPage3 />} />
        <Route path="*" element={<Notfound />} />
        {/* <Route path="/SuccessPage" element={<SuccessPage />} />  */}
      </Routes>
    </>
  );
}

export default App;
