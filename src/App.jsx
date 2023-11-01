import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import { ProtectedRouteElement } from './components/ProtectedRouteElement/ProtectedRouteElement';
import Orders from './pages/Orders';
import Element from './pages/Element';
import Modal from './components/Modal/Modal';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import AppHeader from './components/AppHeader/AppHeader';
import { getBurgerIngredients } from './services/store/burgerIngredients';

function App() {
  const location = useLocation();
  const state = location.state;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state?.backgroundLocation) {
      setIsOpen(true);
    }
  }, [location]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <div className='app'>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id' element={<Element />} />
        <Route path='/orders' element={<Orders />} />
        <Route
          path='/login'
          element={
            <ProtectedRouteElement onlyUnAuth={true} element={<Login />}></ProtectedRouteElement>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRouteElement onlyUnAuth={false} element={<Profile />}></ProtectedRouteElement>
          }
        />
      </Routes>
      {state?.backgroundLocation && isOpen && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} setIsOpen={setIsOpen}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
