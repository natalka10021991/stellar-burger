import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../services/store/burgerIngredients';
import AppHeader from '../components/appHeader/appHeader';
import MainBlock from '../components/mainBlock/mainBlock';

const Home = () => {
  const { burgerIngredients, loadingStatus, error } = useSelector(
    (store) => store.burgerIngredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);
  return (
    <>
      {burgerIngredients && burgerIngredients.length && (
        <>
          <AppHeader />
          <MainBlock />
        </>
      )}
      {loadingStatus === 'loading' && <p>Данные загружаются</p>}
      {error && <h2>Ошибна на сервере</h2>}
    </>
  );
};

export default Home;
