import Header from '../components/layouts/Header';
import InputTable1 from '../components/Input/InputTable1';

const InputPage1 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="light" />
      <main className="mt-30">
        <InputTable1 />
      </main>
    </div>
  );
};

export default InputPage1;
