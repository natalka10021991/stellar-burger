import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientElementStyle from './ingredientElement.module.css';

class IngredientElement extends React.Component {
  constructor(props) {
    super();
    this.state = { current: 'one', data: props.data };
  }

  render() {
    return (
      <div className={ingredientElementStyle.element}>
        <Counter count={1} size='default' extraClass='m-1' />
        <img src={this.state.data.image} alt={this.state.data.name} />
        <p className={`${ingredientElementStyle.price} text text_type_digits-default mt-1 mb-1`}>
          {this.state.data.price}
          <CurrencyIcon type='primary' />
        </p>
        <p className='text text_type_main-small'>{this.state.data.name}</p>
      </div>
    );
  }
}

export default IngredientElement;
