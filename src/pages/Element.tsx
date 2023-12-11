import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import pagesStyles from './styles.module.css';
import { IIngredient } from '../types/data';
import { useSelector } from 'react-redux';

const Element = () => {
  const [ingredient, setIngredient] = useState();
  let { id } = useParams();
  const burgerIngredients = useSelector((store: any) => store.burgerIngredients);


  useEffect(() => {
    if (burgerIngredients && burgerIngredients.burgerIngredients.length) {
      const getIngredientById = (id: string) => {
        return burgerIngredients.burgerIngredients.find((ingredient: IIngredient) => ingredient._id === id);
      };
      let ingredient = id ? getIngredientById(id) : null;
      setIngredient(ingredient);
    }
  }, [burgerIngredients]);
  
  return (
    <>
      {ingredient && (
        <div className={pagesStyles.ingredientWrapper}>
          <h2>Детали ингредиента</h2>
          <IngredientDetails/>
        </div>
      )}
    </>
  );
};

export default Element;
