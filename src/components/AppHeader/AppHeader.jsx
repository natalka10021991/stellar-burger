import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import Menu from '../Menu/Menu';

import styles from './AppHeader.module.css';
import MenuButton from '../MenuButton/MenuButton';

function AppHeader() {
  return (
    <header className={`${styles.header} pl-0 pr-0 pb-4 pt-4`}>
      <Menu />
      <Logo />
      <MenuButton className={styles.menuButton} text={'Личный кабинет'} icon={'profile'} link={'/profile'} />
    </header>
  );
}

export default AppHeader;
