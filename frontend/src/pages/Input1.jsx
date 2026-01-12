import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Input1 = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/Input2');
  };

  return (
    <div>
      <Header />
      <h1>Welcome to the Input1 Page</h1>
      <main className="container mt-4">
        <button onClick={onClickButton}>Input2 페이지로 이동</button>
      </main>
      <Footer />
    </div>
  );
};

export default Input1;
