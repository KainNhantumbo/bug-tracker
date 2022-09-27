import { Navigate } from 'react-router-dom';

export default function ErrorRedirect() {
	localStorage.removeItem('accessToken');
	return <Navigate to={'/tab/login'} />;
}
