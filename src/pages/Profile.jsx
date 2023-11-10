import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import pagesStyles from './styles.module.css';
import { updateUserData, logoutUser } from '../services/store/user';

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '*******',
  });
  const [isDataChanged, setDataChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const handleChange = (e) => {
    setDataChange(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(data));
    setDataChange(false);
  };

  const handleCancel = () => {
    setData(user);
    setDataChange(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user.user?.email && user.user?.name) {
      setData(user.user);
    } else {
      setData(user);
    }
    if (user.LoadingStatus === 'userLoggedOut') {
      navigate('/login');
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
          isIcon
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
          isIcon
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
    </div>
  );
};

export default Profile;
