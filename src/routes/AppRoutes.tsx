import { Route, Routes } from 'react-router-dom';
import ProtectionWrapper from './ProtectionWrapper';
import Main from '../tabs/Main';
import Adjustments from '../tabs/Adjustments';
import CreateBug from '../tabs/CreateBug';
import Login from '../tabs/Login';
import CreateAccount from '../tabs/CreateAccount';
import Message from '../tabs/Message';
import AccountRecovery from '../tabs/AccountRecovery';
import ErrorRedirect from './ErrorRedirect';

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/tab/login' element={<Login />} />
			<Route path='/tab/message/:msg/:id' element={<Message />} />
			<Route path='/tab/account-recovery' element={<AccountRecovery />} />
			<Route path='/tab/create-account' element={<CreateAccount />} />
			<Route
				path='/'
				element={
					<ProtectionWrapper>
						<Main />
					</ProtectionWrapper>
				}
			/>
			<Route
				path='/tab/create-bug/:id'
				element={
					<ProtectionWrapper>
						<CreateBug />
					</ProtectionWrapper>
				}
			/>
			<Route
				path='/tab/adjustments'
				element={
					<ProtectionWrapper>
						<Adjustments />
					</ProtectionWrapper>
				}
			/>
			<Route path='*' element={<ErrorRedirect />} />
		</Routes>
	);
}
