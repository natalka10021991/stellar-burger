import React from 'react';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

class MainBlock extends React.Component {
  constructor(props) {
    super();
    this.state = { data: props.data };
  }

  render() {
    return (
      <div>
        <h1>Соберите бургер</h1>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <BurgerIngredients data={this.state.data} />
          <BurgerConstructor data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default MainBlock;
