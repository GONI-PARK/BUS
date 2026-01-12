import { useNavigate } from 'react-router-dom';

const HomeContainer = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/Input1');
  };

  return (
    <main center>
      <main className="container mt-4">
        <button onClick={onClickButton}>Input1 페이지로 이동</button>
      </main>
    </main>
  );
};

export default HomeContainer;
