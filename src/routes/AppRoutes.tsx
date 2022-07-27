import { Route, Routes } from 'react-router-dom';
import Main from '../tabs/Main';
export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
		</Routes>
	);
}
