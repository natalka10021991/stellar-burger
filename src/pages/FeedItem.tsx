import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import pagesStyles from './styles.module.css';
import { RootState } from '../types';
import dayjs from 'dayjs';

const FeedItem = () => {
  // const [ingredient, setIngredient] = useState();
  // let { id } = useParams();
  // const burgerIngredients = useSelector((store: any) => store.burgerIngredients);

  // useEffect(() => {
  //   if (burgerIngredients && burgerIngredients.burgerIngredients.length) {
  //     const getIngredientById = (id: string) => {
  //       return burgerIngredients.burgerIngredients.find((ingredient: IIngredient) => ingredient._id === id);
  //     };
  //     let ingredient = id ? getIngredientById(id) : null;
  //     setIngredient(ingredient);
  //   }
  // }, [burgerIngredients]);

  let { id } = useParams();
  const orders = useSelector((store: RootState) => store.orders);
  const ingredients = useSelector((store: RootState) => store.burgerIngredients.burgerIngredients);

  const order = orders.orders.orders.find((order) => order._id === id);

  const ingredientElement = (id: string) => {
    const currentIngredient = ingredients.find((item) => item._id === id);
    return (
      <div className='mb-4'>
        <div className={pagesStyles.feedItemElementWrapper}>
          <div className={pagesStyles.feedItemElementInfo}>
            <img src={currentIngredient?.image} alt='' />
            <h3 className='text text_type_main-small'>{currentIngredient?.name}</h3>
          </div>
          <div>
            <p className={`${pagesStyles.feedItemElementPrice} text text_type_digits-default`}>
              {currentIngredient?.price}
              <CurrencyIcon type='primary' />
            </p>
          </div>
        </div>
      </div>
    );
  };
  console.log(order);
  return (
    <div className={pagesStyles.feedItemWrapper}>
      <p className='text text_type_digits-default mb-10'>{`#${order?.number}`}</p>
      <h2 className='text text_type_main-medium mb-3'>{order?.name}</h2>
      <p className='text text_type_main-default'>
        {order?.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>
      <div className='mb-10'>
        <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
        <div className={pagesStyles.ingredientsList}>{order?.ingredients.map((item) => ingredientElement(item))}</div>
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
