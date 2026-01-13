import { useNavigate } from 'react-router-dom';

const InputContainer = ({ targetPath, label }) => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav(targetPath);
  };

  return (
    <main center>
      <main className="container mt-4">
        <button onClick={onClickButton}>{label}'페이지로 이동 표 입력'</button>
      </main>
    </main>
  );
};

export default InputContainer;
