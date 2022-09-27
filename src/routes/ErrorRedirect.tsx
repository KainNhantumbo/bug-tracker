import { Navigate } from 'react-router-dom';

export default function ErrorRedirect(): JSX.Element {
	localStorage.removeItem('accessToken');
	return <Navigate to={'/tab/login'} />;
}
