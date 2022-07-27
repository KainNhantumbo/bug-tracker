import { Route, Routes } from 'react-router-dom';
import Main from '../tabs/Main';
import Adjustments from '../tabs/Adjustments';

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/tab/adjustments' element={<Adjustments />} />
		</Routes>
	);
}
