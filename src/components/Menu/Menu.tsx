import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import menuStyles from './Menu.module.css';

const menuItems = [
  {
    icon: 'burger',
    text: 'Конструктор',
    link: '/',
  },
  {
    icon: 'list',
    text: 'Лента заказов',
    link: '/feed',
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
