import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import pagesStyles from './styles.module.css';
import { setNewPassword } from '../services/store/resetPassword';
import { useDispatch, useSelector } from '../services/store/store';

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: '',
    token: '',
  });
  const dispatch = useDispatch();
  const setNewPasswordRequest = useSelector((store) => store.setNewPassword);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewPassword(values));
  };
  useEffect(() => {
    if (setNewPasswordRequest.loadingStatus === 'success') {
      navigate('/login');
    }
  }, [setNewPasswordRequest]);

  if (!location.state?.forgotPassword) return <Navigate to='/login' />;
  return (
    <div className={pagesStyles.loginWrapper}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={pagesStyles.loginForm} onSubmit={handleSubmit}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, password: e.target.value })
          }
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, token: e.target.value })
          }
          value={values.token}
          name={'code'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />

        <Button htmlType='submit' type='primary' size='large' extraClass='mb-20'>
          Сохранить
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

export default ResetPassword;
