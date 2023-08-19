import {
  FaEnvelope,
  FaLock,
  FaUnlock,
  FaUser,
  FaUserEdit,
  FiAlertTriangle,
  HiArrowLeft,
  HiCheck,
} from 'react-icons/all';
import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputEvents } from '../../@types';
import { useAppContext } from '../context/AppContext';
import feedBack from '../utils/feedback';
import { _editAccount as Container } from '../styles/components/edit-account-box';

interface Props {
  active: boolean;
  quit: () => void;
  reload: () => Promise<void>;
}

interface UserData {
  password: string;
  confirm_password: string;
  email: string;
  user_name: string;
  last_name: string;
  first_name: string;
}

const EditAccountBox: FC<Props> = (props): JSX.Element => {
  const { fetchAPI } = useAppContext();
  const [message, setMessage] = useState<string>('');
  const [accountData, setAccountData] = useState<UserData>({
    password: '',
    confirm_password: '',
    email: '',
    user_name: '',
    last_name: '',
    first_name: '',
  });

  const handleChange = (e: InputEvents): void => {
    setAccountData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (): Promise<void> => {
    const { password, confirm_password } = accountData;

    if (password.length > 0 && password.length < 6)
      return feedBack(
        setMessage,
        'Password must have at least 6 characters.',
        5000
      );

    if (password !== confirm_password)
      return feedBack(setMessage, 'Passwords must match each other.', 5000);

    try {
      const { data } = await fetchAPI({
        method: 'patch',
        url: `/users`,
        data: accountData,
      });
      feedBack(setMessage, data.message, 5000);
      setAccountData((prevData) => ({
        ...prevData,
        password: '',
        confirm_password: '',
      }));
      props.reload();
    } catch (err: any) {
      feedBack(setMessage, err?.response?.data?.message, 5000);
      console.error(err?.response?.data?.message ?? err);
    }
  };

  const getInitialData = async (): Promise<void> => {
    try {
      const { data } = await fetchAPI({ method: 'get', url: '/users' });
      setAccountData({ ...data.user_data, password: '', confirm_password: '' });
    } catch (err: any) {
      console.error(err?.response?.data?.message ?? err);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <AnimatePresence>
      {props.active && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              props.quit();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Edit Account </span>
                <p className='prompt-message'>
                  Here you can modify your account.
                </p>

                <section className='content-container'>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label>
                          <FaUserEdit />
                          <span>
                            First name <i>*</i>
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='Type your first name here.'
                          name='first_name'
                          required
                          value={accountData.first_name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='form-element'>
                        <label>
                          <FaUserEdit />
                          <span>
                            Last name <i>*</i>
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='Type your last name here.'
                          name='last_name'
                          required
                          value={accountData.last_name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label>
                          <FaUser />
                          <span>
                            Username <i>*</i>
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='Type your username here.'
                          name='user_name'
                          value={accountData.user_name}
                          required
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='form-element'>
                        <label>
                          <FaEnvelope />
                          <span>
                            E-mail <i>*</i>
                          </span>
                        </label>
                        <input
                          type='email'
                          placeholder='Type your e-mail here.'
                          name='email'
                          required
                          value={accountData.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </section>

                    <label className='alert'>
                      <FiAlertTriangle />
                      <span>
                        Leave these password fields blank if you don't want to
                        update.
                      </span>
                    </label>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label>
                          <FaUnlock />
                          <span>Password</span>
                        </label>
                        <input
                          type='password'
                          name='password'
                          value={accountData.password}
                          placeholder='Type your password here.'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='form-element'>
                        <label>
                          <FaLock />
                          <span>
                            Confirm Password <i>*</i>
                          </span>
                        </label>
                        <input
                          type='password'
                          name='confirm_password'
                          value={accountData.confirm_password}
                          placeholder='Confirm your password.'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </section>

                    <span className='errorMessage'>{message}</span>
                    <div className='prompt-actions'>
                      <button className='prompt-cancel' onClick={props.quit}>
                        <HiArrowLeft />
                        <span>Cancel</span>
                      </button>
                      <button className='prompt-accept' onClick={handleUpdate}>
                        <HiCheck />
                        <span>Update</span>
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default EditAccountBox;
