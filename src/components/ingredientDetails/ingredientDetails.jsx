import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import ingredientDetailsStyles from './ingredientDetails.module.css';

const modalRoot = document.getElementById('modals');

function IngredientDetails({ title, ingredient, setIsOpen }) {
  return createPortal(
    <ModalOverlay title={title} setIsOpen={setIsOpen}>
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
    </ModalOverlay>,
    modalRoot
  );
}

IngredientDetails.propTypes = {
  title: PropTypes.string,
  ingredient: ingredientPropTypes,
  setIsOpen: PropTypes.func
};

export default IngredientDetails;
