import Header from '../components/Header';
import Footer from '../components/Footer';
import InputContainer from '../components/InputContainer';
import { useNavigate } from 'react-router-dom';

const Input3 = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Input3 Page</h1>
      <InputContainer targetPath="/SuccessPage" label="SuccessPage" />
      <Footer />
    </div>
  );
};

export default Input3;
