import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	children: JSX.Element;
}

// used to restrict access to routes that require authentication
const ProtectionWrapper: FC<Props> = ({ children }) => {
	const { token } = JSON.parse(
		localStorage.getItem('accessToken') || `{"token":""}`
	);
	if (!token) return <Navigate to={'/tab/login'} />;
	return children;
};

export default ProtectionWrapper;