import { Route, Routes } from 'react-router-dom';
import Main from '../tabs/Main';
import Adjustments from '../tabs/Adjustments';
import CreateBug from '../tabs/CreateBug';
import Login from '../tabs/Login';
import CreateAccount from '../tabs/CreateAccount';
import Message from '../tabs/Message';
import AccountRecovery from '../tabs/AccountRecovery';

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/tab/login' element={<Login />} />
			<Route path='/tab/account-recouvery' element={<AccountRecovery />} />
			<Route path='/tab/message/:msg/:id' element={<Message />} />
			<Route path='/tab/create-account' element={<CreateAccount />} />
			<Route path='/tab/create-bug/:id' element={<CreateBug />} />
			<Route path='/tab/adjustments' element={<Adjustments />} />
		</Routes>
	);
}
