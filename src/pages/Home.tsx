import { useSelector } from 'react-redux';
import { RootState } from '../services/store/store';
import MainBlock from '../components/MainBlock/MainBlock';

const Home = () => {
  const { burgerIngredients, loadingStatus, error } = useSelector(
    (store: RootState) => store.burgerIngredients
  );
  return (
    <>
      {burgerIngredients && burgerIngredients.length && <MainBlock />}
      {loadingStatus === 'loading' && <p>Данные загружаются</p>}
      {error && <h2>Ошибна на сервере</h2>}
    </>
  );
};

export default Home;
