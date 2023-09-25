import React from 'react';
import { ProfileIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import buttonStyles from './menuButton.module.css';

class MenuButton extends React.Component {
  render() {

    const renderIcon = () => {
      switch (this.props.icon) {
        case 'burger':
        return  <BurgerIcon type='primary' />
        case 'profile':
          return <ProfileIcon type='primary' />
         case 'list':
          return <ProfileIcon type='primary' />
         default:
          return <></>
      }
    }
    return (
      <a href='#' className={`${buttonStyles.button} pl-4 pr-4 pt-4 pb-4 `}>
        {renderIcon()}
        <span className={`ml-2 text text_type_main-default`}>{this.props.text}</span>
      </a>
    );
  }
}

export default MenuButton;
