import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Input3 = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/SuccessPage');
  };

  return (
    <div>
      <Header />
      <h1>Welcome to the Input3 Page</h1>
      <main className="container mt-4">
        <button onClick={onClickButton}>SuccessPage 페이지로 이동</button>
      </main>
      <Footer />
    </div>
  );
};

export default Input3;
