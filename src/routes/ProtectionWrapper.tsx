import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

type TProps = { children: JSX.Element };

// used to restrict access to routes that require authentication
const ProtectionWrapper: FC<TProps> = ({ children }): JSX.Element => {
  const { state } = useAppContext();
  if (!state.auth.token) return <Navigate to={'/tab/login'} />;
  return children;
};

export default ProtectionWrapper;
