import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/appHeader/appHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';

const RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(RESET_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: value,
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
          navigate('/reset-password');
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
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={'email'}
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
            Восстановить
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

export default ForgotPassword;
