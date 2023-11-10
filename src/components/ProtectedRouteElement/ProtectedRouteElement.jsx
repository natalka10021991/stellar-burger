import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement = ({ onlyUnAuth, element }) => {
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const isAuthChecked = user.user.email && user.user.name;
  const { from } = location.state || { from: { pathname: '/' } }; //login
  if (user.loadingStatus === 'patchingIsLoading' || user.loadingStatus === 'gettingDataIsLoading')
    return <div>Updating...</div>;

  if (!onlyUnAuth && !isAuthChecked) {
    return (
      <Navigate to='/login' state={{ from: location }} /> //profile
    );
  }
  if (onlyUnAuth && isAuthChecked) {
    return <Navigate to={from} />;
  }

  return element;
};
