import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Profile from './pages/profile';
import { ProtectedRouteElement } from './components/protectedRouteElement/protectedRouteElement';
import Orders from './pages/orders';
import Element from './pages/element';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredientDetails/ingredientDetails';

function App() {
  let location = useLocation();
  let state = location.state;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state?.backgroundLocation) {
      setIsOpen(true);
    }
  }, [location]);

  return (
    <div className='app'>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id' element={<Element />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={<ProtectedRouteElement element={<Profile />}></ProtectedRouteElement>}
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
