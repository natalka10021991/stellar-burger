import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useParams } from 'react-router-dom';
import pagesStyles from './styles.module.css';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../services/store/store';
import { getOrder } from '../services/store/order/order';

interface ISortedIngredients {
  amount: number;
  _id: string;
}

const FeedItem = () => {
  const [sortedIngredients, setSortedIngredients] = useState<ISortedIngredients[]>([]);
  let { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients);
  const order = useSelector((store) => store.order.order);
  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, []);

  useEffect(() => {
    if (order?._id) {
      let filteredIngredients: ISortedIngredients[] = [];
      order.ingredients.forEach((ingredient) => {
        const copy = filteredIngredients.find((item) => item._id === ingredient);

        if (!copy) {
          filteredIngredients = [...filteredIngredients, { amount: 1, _id: ingredient }];
        } else {
          filteredIngredients.map((item) => {
            if (item._id === copy._id) {
              return (item.amount = item.amount + 1);
            }
          });
        }
      });
      setSortedIngredients(filteredIngredients);
    }
  }, [order]);

  const ingredientElement = (ingredient: ISortedIngredients, i: number) => {
    const currentIngredient = ingredients.find((item) => item._id === ingredient._id);

    return (
      <div className='mb-4' key={i}>
        <div className={pagesStyles.feedItemElementWrapper}>
          <div className={pagesStyles.feedItemElementInfo}>
            <img src={currentIngredient?.image} alt='' />
            <h3 className='text text_type_main-small'>{currentIngredient?.name}</h3>
          </div>
          <div>
            <p className={`${pagesStyles.feedItemElementPrice} text text_type_digits-default`}>
              {ingredient.amount} x {currentIngredient?.price}
              <CurrencyIcon type='primary' />
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={pagesStyles.feedItemWrapper}>
      <p className='text text_type_digits-default mb-10'>{`#${order?.number}`}</p>
      <h2 className='text text_type_main-medium mb-3'>{order?.name}</h2>
      <p className='text text_type_main-default'>
        {order?.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>
      <div className='mb-10'>
        <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
        <div className={pagesStyles.ingredientsList}>
          {sortedIngredients?.map((ingredient, i) => ingredientElement(ingredient, i))}
        </div>
      </div>
      <div className={pagesStyles.feedItemFooter}>
        <p> {dayjs(order?.createdAt).locale('ru').format('DD MMMM, h:mm')}</p>
        <p className={`${pagesStyles.feedItemFooterPrice} text text_type_digits-default`}>
          510 <CurrencyIcon type='primary' />
        </p>
      </div>
    </div>
  );
};

export default FeedItem;
