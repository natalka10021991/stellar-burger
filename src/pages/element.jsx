import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../components/appHeader/appHeader';
import IngredientDetails from '../components/ingredientDetails/ingredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../services/store/burgerIngredients';
import pagesStyles from './styles.module.css';

const Element = () => {
  const [ingredient, setIngredient] = useState();
  let { id } = useParams();
  const burgerIngredients = useSelector((store) => store.burgerIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  useEffect(() => {
    if (burgerIngredients && burgerIngredients.burgerIngredients.length) {
      const getIngredientById = (id) => {
        return burgerIngredients.burgerIngredients.find((ingredient) => ingredient._id === id);
      };
      let ingredient = getIngredientById(id);
      setIngredient(ingredient);
    }
  }, [burgerIngredients]);
  return (
    <>
      <AppHeader />
      {ingredient && (
        <div className={pagesStyles.ingredientWrapper}>
          <h2>Детали ингредиента</h2>
          <IngredientDetails ingredient={ingredient} />
        </div>
      )}
    </>
  );
};

export default Element;
