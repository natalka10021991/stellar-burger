import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement = ({ onlyUnAuth, element }) => {
  const location = useLocation();
  const user = useSelector((store) => store.loginUser);
  const isUserData = useSelector((store => store.getUser.isUser))

const isAuthChecked = user.isAuthenticated || isUserData
if (!onlyUnAuth && isAuthChecked) {
  return (
    element  //profile
  )
}

  if (!onlyUnAuth && !isAuthChecked) {
    return (
      <Navigate to='/login' state={{ from: location }} />  //profile
    )
  }

    if (onlyUnAuth && isAuthChecked) {
    const { from } = location.state || { from: { pathname: '/' } }; //login
    return <Navigate to={from} />;
  }

  return element;

};
