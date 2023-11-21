import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  onlyUnAuth: boolean;
  element: ReactNode;
}

export const ProtectedRouteElement: FC<Props> = ({ onlyUnAuth, element }) => {
  const location = useLocation();
  const user = useSelector((store: any) => store.user);
  console.log(user, 'user')

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

  return <>{element}</>;
};
