import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface Props {
  children: JSX.Element;
}

// used to restrict access to routes that require authentication
const ProtectionWrapper: FC<Props> = ({ children }): JSX.Element => {
  const { accessToken } = useAppContext();
  
  if (!accessToken) return <Navigate to={'/tab/login'} />;
  return children;
};

export default ProtectionWrapper;
