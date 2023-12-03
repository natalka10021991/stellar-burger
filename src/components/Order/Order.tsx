import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { IOrder, IIngredient } from '../../types/data';
import orderStyles from './Order.module.css';

interface Props {
  data: IOrder;
}

const Order: FC<Props> = ({ data }) => {
  const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients);
  const location = useLocation();
  const findIngredient = (id: string) => {
    return ingredients.find((item) => item._id === id);
  };

  const orderElements = () => {
    let arr: any[] = [];
    data.ingredients.forEach((ingredient) => {
      const curr = ingredients.find((item) => item._id === ingredient);
      arr = [...arr, curr];
    });
    const sum = arr.reduce((sum: number, current: IIngredient) => {
      return sum + current?.price;
    }, 0);
    return sum;
  };

  return (
    <Link to={`${data._id}`} className={orderStyles.link} state={{ backgroundLocation: location }}>
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
            {data.ingredients.map((item) => (
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
