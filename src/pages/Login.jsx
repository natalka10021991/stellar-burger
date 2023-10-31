import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/store/login';
import { getUser } from '../services/store/user';
import { updateToken } from '../services/store/updateToken';
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, []);

  useEffect(() => {
    if (user.user && user.error === 'jwt expired') {
      const token = localStorage.getItem('accessToken');
      dispatch(updateToken(token));
    }

    if (user.user && user.user.email) {
      const token = localStorage.getItem('accessToken');
      dispatch(getUser(token));
    }
  }, [user]);

  if (userLogin.isAuthenticated) return <Navigate to='/' replace />;

  return (
    <div className={pagesStyles.loginWrapper}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <form className={pagesStyles.loginForm} onSubmit={handleSubmit}>
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
          htmlType='submit'
          type='primary'
          size='large'
          extraClass='mb-20'
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
  );
};

export default Login;
