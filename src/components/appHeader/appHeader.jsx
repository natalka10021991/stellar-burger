import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import Menu from '../menu/menu';

import styles from './appHeader.module.css';
import MenuButton from '../menuButton/menuButton';



class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header} pl-0 pr-0 pb-4 pt-4`}>
        <Menu />
        <Logo />
        <MenuButton className={styles.menuButton} text={'Личный кабинет'} icon={'profile'} />
      </header>
    );
  }
}

export default AppHeader;
