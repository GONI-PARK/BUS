import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/Input1');
  };

  return (
    <div>
      <Header />
      <button onClick={onClickButton}>Input1 페이지로 이동</button>
    </div>
  );
};

export default Home;
