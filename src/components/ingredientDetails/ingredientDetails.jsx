import { useParams } from 'react-router-dom';
import { ingredientPropTypes } from '../../utils/types';
import { useSelector } from 'react-redux';
import { getBurgerIngredients } from '../../services/utils';
import ingredientDetailsStyles from './ingredientDetails.module.css';

function IngredientDetails() {
  let { id } = useParams();
  const burgerIngredients = useSelector(getBurgerIngredients);
  const getIngredientById = (id) => {
    return burgerIngredients.find((ingredient) => ingredient._id === id);
  };
  let ingredient = getIngredientById(id);

  if (!ingredient) return null;
  return (
    <>
      <img src={ingredient.image} alt={ingredient.name} className='mb-4' />
      <p className='text text_type_main-medium mb-8'>{ingredient.name}</p>
      <div className={ingredientDetailsStyles.info}>
        <p className={`${ingredientDetailsStyles.infoBox} text text_type_main-small`}>
          <span>Калории,ккал</span>
          <br />
          <span>{ingredient.calories}</span>
        </p>
        <p className={`${ingredientDetailsStyles.infoBox} text text_type_main-small`}>
          <span>Белки, г</span>
          <br />
          <span>{ingredient.proteins}</span>
        </p>
        <p className={`${ingredientDetailsStyles.infoBox} text text_type_main-small`}>
          <span>Жиры, г</span>
          <br />
          <span>{ingredient.fat}</span>
        </p>
        <p className={`${ingredientDetailsStyles.infoBox} text text_type_main-small`}>
          <span>Углеводы, г</span>
          <br />
          <span>{ingredient.carbohydrates}</span>
        </p>
      </div>
    </>
  );
}

export default IngredientDetails;
