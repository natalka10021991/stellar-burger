import React from 'react';
import { ProfileIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import buttonStyles from './menuButton.module.css';
import { PropTypes } from 'prop-types';

function MenuButton({icon, text}) {
  const renderIcon = () => {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type='primary' />;
      case 'profile':
        return <ProfileIcon type='primary' />;
      case 'list':
        return <ProfileIcon type='primary' />;
      default:
        return <></>;
    }
  };
  return (
    <a href='#' className={`${buttonStyles.button} pl-4 pr-4 pt-4 pb-4 `}>
      {renderIcon()}
      <span className={`ml-2 text text_type_main-default`}>{text}</span>
    </a>
  );
}

MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default MenuButton;
