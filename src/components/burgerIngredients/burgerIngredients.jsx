import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from '../ingredientElement/ingredientElement';

import burgerIngredientsStyles from './burgerIngredients.module.css';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super();
    this.state = { current: 'one', data: props.data };
    this.getType = this.getType.bind(this);
  }

  getType(type) {
    return this.state.data.filter((item) => item.type === type);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
        <div style={{ display: 'flex' }}>
          <Tab
            value='one'
            active={this.state.current === 'one'}
            onClick={() => this.setState({ current: 'one' })}
          >
            Булки
          </Tab>
          <Tab
            value='two'
            active={this.state.current === 'two'}
            onClick={() => this.setState({ current: 'two' })}
          >
            Соусы
          </Tab>
          <Tab
            value='three'
            active={this.state.current === 'three'}
            onClick={() => this.setState({ current: 'three' })}
          >
            Начинки
          </Tab>
        </div>
        <div className={burgerIngredientsStyles.ingredients}>
          <div>
            <h2 className={burgerIngredientsStyles.title}>Булки</h2>
            <div className={burgerIngredientsStyles.ingredientsWrapper}>
              {this.getType('bun').map((item) => {
                return <IngredientElement data={item} />;
              })}
            </div>
          </div>

          <div>
            <h2 className={burgerIngredientsStyles.title}>Соусы</h2>
            <div className={burgerIngredientsStyles.ingredientsWrapper}>
              {this.getType('sauce').map((item) => {
                return <IngredientElement data={item} />;
              })}
            </div>
          </div>

          <div>
            <h2 className={burgerIngredientsStyles.title}>Начинки</h2>
            <div className={burgerIngredientsStyles.ingredientsWrapper}>
              {this.getType('main').map((item) => {
                return <IngredientElement data={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
