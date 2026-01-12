import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import HomeContainer from '../components/HomeContainer';

const Home = () => {
  return (
    <div>
      <Header />
      <HomeContainer />
      <Footer />
    </div>
  );
};

export default Home;
