import {
  NavigateFunction,
  useNavigate,
  useLocation,
  Location,
} from 'react-router-dom';
import { FC } from 'react';
import { motion } from 'framer-motion';
import actions from '../reducers/actions';
import PromptDialogBox from './PromptDialogBox';
import { useAppContext } from '../context/AppContext';
import { _header as Container } from '../styles/components/header';
import { BiLogOut, FaBug, HiAdjustments, HiSparkles } from 'react-icons/all';

const Header: FC = (): JSX.Element => {
  const { pathname }: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { fetchAPI, dispatch, state } = useAppContext();

  const handleLogout = async (): Promise<void> => {
    try {
      await fetchAPI({ method: 'post', url: '/auth/logout' });
      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: { ...state.auth, token: '', username: '' },
        },
      });
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
        icon={BiLogOut}
        action={handleLogout}
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
          <span>Hi {state.auth.username}!</span>
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
            onClick={() =>
              dispatch({
                type: actions.PROMPT_BOX_CONTROL,
                payload: { ...state, isPromptActive: true },
              })
            }>
            <BiLogOut />
          </motion.button>
        </div>
      </section>
    </Container>
  );
};

export default Header;
