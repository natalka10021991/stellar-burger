import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../types';
import orderStyles from './Order.module.css';

interface Props {
  data: any;
}

const Order: FC<Props> = ({ data }) => {
  const ingredients = useSelector((store: RootState) => store.burgerIngredients.burgerIngredients);

  const findIngredient = (id: string) => {
    return ingredients.find((item) => item._id === id);
  };

  const orderElements = () => {
    let arr: any[] = [];
    data.ingredients.forEach((ingredient: string) => {
      const curr = ingredients.find((item) => item._id === ingredient);
      console.log(ingredient, curr, 'ingredient');
      arr = [...arr, curr];
    });
    const sum = arr.reduce((sum: any, current: any) => {
      return sum + current.price;
    }, 0);
    return sum;
  };
  
  return (
    <Link to={`${data._id}`} className={orderStyles.link}>
      <div className={orderStyles.wrapper}>
        <div className={orderStyles.orderHeader}>
          <p className='text text_type_digits-default'>{data.number}</p>
          <p className='text text_type_main-default text_color_inactive'>
            {dayjs(data.createdAt).locale('ru').format('DD MMMM, h:mm')}
          </p>
        </div>
        <h3 className={`text text_type_main-medium`}>{data.name}</h3>
        <div className={orderStyles.orderFooter}>
          <div className={orderStyles.orderIngredients}>
            {data.ingredients.map((item: any, i: number) => (
              <div className={orderStyles.orderIngredient}>
                <img src={findIngredient(item)?.image} alt='' />
              </div>
            ))}
          </div>
          <div className={`${orderStyles.orderPrice} text text_type_digits-default`}>
            {orderElements()} <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Order;
