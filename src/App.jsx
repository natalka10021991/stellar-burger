import { useEffect } from 'react';
import AppHeader from './components/appHeader/appHeader';
import MainBlock from './components/mainBlock/mainBlock';
import { getBurderIngredients } from './services/actions/burgerIngredients';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const {burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed } = useSelector(store => store.burgerIngredients)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurderIngredients())
  }, []);

  return (
    <div className='App'>
      {burgerIngredients && burgerIngredients.length && (
        <div className='appWrapper'>
          <AppHeader />
          <MainBlock/>
        </div>
      )}
      {burgerIngredientsRequest && <p>Данные загружаются</p>}
      {burgerIngredientsFailed && <h2>Ошибна на сервере</h2>}
    </div>
  );
}

export default App;
