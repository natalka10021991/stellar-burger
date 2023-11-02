import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import buttonStyles from './MenuButton.module.css';
import { PropTypes } from 'prop-types';

function MenuButton({ icon, text, link }) {
  const location = useLocation();
  const renderIcon = () => {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type='primary' />;
      case 'profile':
        return <ProfileIcon type='primary' />;
      case 'list':
        return <ListIcon type='primary' />;
      default:
        return <></>;
    }
  };
  return (
    <NavLink
      to={link}
      className={() =>
        location.pathname === link
          ? `${buttonStyles.button} ${buttonStyles.active} pl-4 pr-4 pt-4 pb-4`
          : `${buttonStyles.button} pl-4 pr-4 pt-4 pb-4`
      }
    >
      {renderIcon()}
      <span className={`ml-2 text text_type_main-default`}>{text}</span>
    </NavLink>
  );
}
// {`${buttonStyles.button} pl-4 pr-4 pt-4 pb-4 `}
MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default MenuButton;
