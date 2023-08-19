import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

const ErrorRedirect: FC = (): JSX.Element => {
  localStorage.removeItem('accessToken');
  return <Navigate to={'/tab/login'} />;
};

export default ErrorRedirect;
