import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import pagesStyles from './styles.module.css';
import { updateUser } from '../services/store/user';
import { logoutUser } from '../services/store/login';

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '*******',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.getUser.user);
  const loginUser = useSelector((store) => store.loginUser);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  };

  const handleCancel = () => {
    setData(user);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    if (loginUser.isAuthenticated) {
      setData(loginUser.user);
    } else {
      setData(user);
    }

  }, [user]);

  return (
    <div className={pagesStyles.profileWrapper}>
      <div className={`${pagesStyles.profileMenu} text text_type_main-medium`}>
        <NavLink
          to='/profile'
          style={(isActive) => {
            return {
              color: isActive ? 'white' : '',
            };
          }}
        >
          Профиль
        </NavLink>
        <NavLink to='/profile/orders'>История заказов</NavLink>
        <NavLink to='/logout' onClick={handleLogout}>
          Выход
        </NavLink>
      </div>
      <form className={pagesStyles.registerForm} onSubmit={handleSubmit}>
        <EmailInput
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={(data && data.name) ?? ''}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          isIcon={true}
        />
        <EmailInput
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={(data && data.email) ?? ''}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          isIcon={true}
        />
        <PasswordInput
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleChange}
          value={(data && data.password) ?? ''}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          isIcon={true}
        />
        <div className={pagesStyles.buttonsWrapper}>
          {data && (data.email || data.name || data.password) && (
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
    </div>
  );
};

export default Profile;
