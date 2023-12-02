import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import pagesStyles from './styles.module.css';
import { updateUserData, logoutUser } from '../services/store/user';
import { AppDispatch, RootState } from '../services/store/store';
import { IUser } from '../types/data';
import Order from '../components/Order/Order';
import { connectHistory, disconnectHistory } from '../services/orders/actions';

const Profile = () => {
  const [data, setData] = useState<IUser>({
    name: '',
    email: '',
    password: '*******',
  });
  const [isDataChanged, setDataChange] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store: RootState) => store.user);
  const token = localStorage.getItem('accessToken');

  const url = `${`wss://norma.nomoreparties.space/orders`}?token=${token}`;
  const dispatch = useDispatch<AppDispatch>();
  const connect = () => dispatch(connectHistory(url));
  const disconnect = () => dispatch(disconnectHistory());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataChange(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData(data));
    setDataChange(false);
  };

  const handleCancel = () => {
    setData(user.user);
    setDataChange(false);
  };

  const historyOrders = useSelector((store: RootState) => store.history.orders.orders);
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user.user?.email && user.user?.name) {
      setData(user.user);
    } else {
      setData(user.user);
    }
    if (user.loadingStatus === 'userLoggedOut') {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/profile/orders') {
      setActiveTab('orders');
    }
    if (location.pathname === '/profile') {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  return (
    <div className={pagesStyles.profileWrapper}>
      <div className={`${pagesStyles.profileMenu} text text_type_main-medium`}>
        <NavLink
          to='/profile'
          style={activeTab === 'profile' ? {color: 'white'} : {}}
        >
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' style={activeTab === 'orders' ? {color: 'white'} : {}}>История заказов</NavLink>
        <NavLink to='/login' onClick={handleLogout}>
          Выход
        </NavLink>
      </div>
      {activeTab === 'profile' ? (
        <form className={pagesStyles.registerForm} onSubmit={handleSubmit}>
          <EmailInput
            placeholder={'Имя'}
            onChange={handleChange}
            value={(data && data.name) ?? ''}
            name={'name'}
            size={'default'}
            extraClass='mb-6'
            isIcon
          />
          <EmailInput
            placeholder={'E-mail'}
            onChange={handleChange}
            value={(data && data.email) ?? ''}
            name={'email'}
            size={'default'}
            extraClass='mb-6'
            isIcon
          />
          <PasswordInput
            placeholder={'Пароль'}
            onChange={handleChange}
            value={(data && data.password) ?? ''}
            name={'password'}
            size={'default'}
            extraClass='mb-6'
            icon='ShowIcon'
          />
          <div className={pagesStyles.buttonsWrapper}>
            {isDataChanged && (
              <>
                {' '}
                <Button
                  htmlType='button'
                  type='secondary'
                  size='large'
                  extraClass='mr-4'
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
                <Button htmlType='submit' type='primary' size='large'>
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </form>
      ) : (
        <div className={pagesStyles.myOrders}>
          {historyOrders.map((order) => (
            <Order data={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
