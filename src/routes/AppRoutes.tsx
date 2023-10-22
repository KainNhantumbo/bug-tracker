import type { FC } from 'react';
import Main from '../tabs/Main';
import Login from '../tabs/Login';
import Message from '../tabs/Message';
import CreateBug from '../tabs/CreateBug';
import ErrorRedirect from './ErrorRedirect';
import Adjustments from '../tabs/Adjustments';
import { Route, Routes } from 'react-router-dom';
import CreateAccount from '../tabs/CreateAccount';
import ProtectionWrapper from './ProtectionWrapper';
import AccountRecovery from '../tabs/AccountRecovery';
import Home from '../tabs/Home';

const AppRoutes: FC = (): JSX.Element => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/tab/login' element={<Login />} />
    <Route path='/tab/message/:msg/:id' element={<Message />} />
    <Route path='/tab/account-recovery' element={<AccountRecovery />} />
    <Route path='/tab/create-account' element={<CreateAccount />} />
    <Route
      path='/tab/workspace'
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

export default AppRoutes;
