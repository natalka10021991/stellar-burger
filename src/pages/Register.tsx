import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';
import { registerUser } from '../services/store/auth';
import { getUser } from '../services/store/user';
import { useDispatch, useSelector } from '../services/store/store';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.registerUser);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/login');
    }
  }, [user.isAuthenticated]);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!!token) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className={pagesStyles.loginWrapper}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form id='register-form' className={pagesStyles.registerForm} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleFormChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
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
          disabled={!form.email || !form.name || !form.password}
          htmlType='submit'
          type='primary'
          size='large'
          extraClass='mb-20'
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-small'>
        Уже зарегистрированы?
        <Button htmlType='button' type='secondary' size='medium' onClick={() => navigate('/login')}>
          Войти
        </Button>
      </p>
    </div>
  );
};

export default Register;
