import {
  BiLogOut,
  BiPowerOff,
  FaBug,
  HiAdjustments,
  HiSparkles,
} from 'react-icons/all';
import {
  NavigateFunction,
  useNavigate,
  useLocation,
  Location,
} from 'react-router-dom';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import PromptDialogBox from './PromptDialogBox';
import { useAppContext } from '../context/AppContext';
import { _header as Container } from '../styles/components/header';

const Header: FC = (): JSX.Element => {
  const { pathname }: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { user, fetchAPI, setUser } = useAppContext();
  const [isLogOutActive, setIsLogOutActive] = useState<boolean>(false);

  const logOutBoxController = (): void =>
    setIsLogOutActive((prevState) => !prevState);

  const logOut = async (): Promise<void> => {
    try {
      await fetchAPI({ method: 'post', url: '/auth/logout' });
      setUser({ username: '', token: '' });
      navigate('/tab/login');
    } catch (err: any) {
      console.error(err?.response?.data?.message ?? err);
    }
  };

  return (
    <Container>
      <PromptDialogBox
        prompt_title='Log out'
        prompt_message='Do you really want to log out?'
        button_text='Log out'
        active={isLogOutActive}
        icon={<BiPowerOff />}
        action={logOut}
        quit={logOutBoxController}
      />
      <section className='mark'>
        <h1>
          <FaBug />
          <span>Bug Tracker</span>
        </h1>
      </section>
      <section className='side-back'>
        <h5>
          <HiSparkles />
          <span>Hi {user.username}!</span>
        </h5>
        <div className='actions'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className='user'
            title='Settings and adjustments'
            onClick={() => {
              if (pathname === '/tab/adjustments') return;
              navigate('/tab/adjustments');
            }}>
            <HiAdjustments />
          </motion.button>

          <motion.button
            className='user'
            title='Log out'
            whileTap={{ scale: 0.9 }}
            onClick={logOutBoxController}>
            <BiLogOut />
          </motion.button>
        </div>
      </section>
    </Container>
  );
};

export default Header;
