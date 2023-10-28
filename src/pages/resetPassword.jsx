import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/appHeader/appHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';

const UPDATE_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: '',
    token: '',
  });

  const navigate = useNavigate();

  const handleClick = () => {
    fetch(UPDATE_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        password: values.password,
        token: values.token,
      }),
    })
      .then((res) => {
        if (res && res.ok) {
          return res.json();
        } else {
          console.log(res.status);
        }
      })
      .then((data) => {
        if (data.success) {
          navigate('/login');
        } else {
          console.log(data);
        }
      })
      .catch((e) => console.log(e, 'error'));
  };
  return (
    <>
      <AppHeader />
      <div className={pagesStyles.loginWrapper}>
        <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
        <form className={pagesStyles.loginForm}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            value={values.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setValues({ ...values, token: e.target.value })}
            value={values.token}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mb-6'
          />

          <Button
            htmlType='button'
            type='primary'
            size='large'
            extraClass='mb-20'
            onClick={handleClick}
          >
            Сохранить
          </Button>
        </form>
        <p className='text text_type_main-small'>
          Вспомнили пароль?{' '}
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            onClick={() => navigate('/login')}
          >
            Войти
          </Button>
        </p>
      </div>
    </>
  );
};

export default ResetPassword;
