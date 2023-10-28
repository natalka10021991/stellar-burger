import React from 'react';
import MenuButton from '../menuButton/menuButton';
import menuStyles from './menu.module.css';

const menuItems = [
  {
    icon: 'burger',
    text: 'Конструктор',
    link: '/',
  },
  {
    icon: 'list',
    text: 'Лента заказов',
    link: '/orders',
  },
];

function Menu() {
  return (
    <nav>
      <ul className={menuStyles.menu}>
        {menuItems.map((item, i) => {
          return (
            <li className={menuStyles.menuItem} key={i}>
              <MenuButton text={item.text} icon={item.icon} link={item.link} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Menu;
