import Header from '../components/Header';
import Footer from '../components/Footer';
import InputContainer from '../components/InputContainer';
import Input1Table from '../components/Input1Table';
import { useNavigate } from 'react-router-dom';

const Input1 = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Input1 Page</h1>

      <main className="container mt-4">
        <Input1Table />
      </main>

      <InputContainer targetPath="/Input2" label="Input2" />

      <Footer />
    </div>
  );
};

export default Input1;
