import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import pagesStyles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../services/store/resetPassword';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPasswordRequest = useSelector((store) => store.resetPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(value));
  };

  useEffect(() => {
    if (resetPasswordRequest.loadingStatus === 'success') {
      navigate('/reset-password', {state: {forgotPassword: true} });
    }
  }, [resetPasswordRequest]);

  return (
    <div className={pagesStyles.loginWrapper}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={pagesStyles.loginForm} onSubmit={handleSubmit}>
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

        <Button htmlType='submit' type='primary' size='large' extraClass='mb-20'>
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-small'>
        Вспомнили пароль?{' '}
        <Button htmlType='button' type='secondary' size='medium' onClick={() => navigate('/login')}>
          Войти
        </Button>
      </p>
    </div>
  );
};

export default ForgotPassword;
