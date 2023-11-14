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
import { AppDispatch, RootState } from '../services/store/store';
import { IUser } from '../utils/types';

const Profile = () => {
  const [data, setData] = useState<IUser>({
    name: '',
    email: '',
    password: '*******',
  });
  const [isDataChanged, setDataChange] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataChange(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserData(data));
    setDataChange(false);
  };

  const handleCancel = () => {
    setData(user.user);
    setDataChange(false);
  };

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
        <NavLink to='/login' onClick={handleLogout}>
          Выход
        </NavLink>
      </div>
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
    </div>
  );
};

export default Profile;
