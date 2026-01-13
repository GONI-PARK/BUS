import Header from '../components/Header';
import Footer from '../components/Footer';
import InputContainer from '../components/InputContainer';
import { useNavigate } from 'react-router-dom';

const Input2 = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Input2 Page</h1>
      <InputContainer targetPath="/Input3" label="Input3" />
      <Footer />
    </div>
  );
};

export default Input2;
