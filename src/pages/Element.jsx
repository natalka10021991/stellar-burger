import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import pagesStyles from './styles.module.css';

const Element = () => {
  const [ingredient, setIngredient] = useState();
  let { id } = useParams();
  const burgerIngredients = useSelector((store) => store.burgerIngredients);


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
