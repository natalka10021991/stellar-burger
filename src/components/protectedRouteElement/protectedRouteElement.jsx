import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteElement = ({ element }) => {
  const user = useSelector((store) => store.loginUser);
  return user.isAuthenticated ? element : <Navigate to='/login' replace />;
};
