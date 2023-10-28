import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AppHeader from '../components/appHeader/appHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, updateUser } from '../services/store/login';
import { getCookie } from '../services/utils';
import { getUser } from '../services/store/user';
import { UPDATE_TOKEN } from '../routes';
const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((store) => store.loginUser);
  const user = useSelector((store) => store.getUser);
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const updateToken = () => {
    fetch(UPDATE_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(res => res.json())
    .then(data => data)
    .catch(e => console.log(e, 'error'))
  }

  useEffect(() => {
    const token = getCookie('accessToken')
    if (token) {
      dispatch(getUser())
    }
  }, [])

  useEffect(() => {
    if (user.user && user.error === 'jwt expired') {
      updateToken()
    }
    if (user.user && user.user.email) {
      dispatch(updateUser());
    }
  }, [user])

  if (userLogin.isAuthenticated) return <Navigate to='/' replace />;

  return (
    <>
      <AppHeader />
      <div className={pagesStyles.loginWrapper}>
        <h2 className='text text_type_main-medium mb-6'>Вход</h2>
        <form className={pagesStyles.loginForm}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleFormChange}
            value={form.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleFormChange}
            icon={'CurrencyIcon'}
            value={form.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
          />
          <Button
            disabled={!form.email || !form.password}
            htmlType='button'
            type='primary'
            size='large'
            extraClass='mb-20'
            onClick={handleClick}
          >
            Войти
          </Button>
        </form>
        <p className='text text_type_main-small'>
          Вы — новый пользователь?{' '}
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className='text text_type_main-small'>
          Забыли пароль?
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            onClick={() => navigate('/forgot-password')}
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </>
  );
};

export default Login;
