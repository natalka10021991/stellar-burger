import React from 'react';
import MenuButton from '../menuButton/menuButton';
import menuStyles from './menu.module.css';

const menuItems = [
  {
    icon: 'burger',
    text: 'Конструктор',
  },
  {
    icon: 'list',
    text: 'Лента заказов',
  },
];

class Menu extends React.Component {
  render() {
    return (
      <nav>
        <ul className={menuStyles.menu}>
          {menuItems.map((item, i) => {
            return (
              <li className={menuStyles.menuItem} key={i}>
                <MenuButton text={item.text} icon={item.icon} />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Menu;
