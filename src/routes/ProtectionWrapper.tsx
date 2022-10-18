import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface Props {
  children: JSX.Element;
}

// used to restrict access to routes that require authentication
const ProtectionWrapper: FC<Props> = ({ children }): JSX.Element => {
  const { user } = useAppContext();

  if (!user.token) return <Navigate to={'/tab/login'} />;
  return children;
};

export default ProtectionWrapper;
