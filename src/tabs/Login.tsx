import {
  FaLock,
  BiLogIn,
  FaBug,
  BiLockOpen,
  FaEnvelope,
} from 'react-icons/all';
import { FC, useState } from 'react';
import feedBack from '../utils/feedback';
import { apiClient } from '../api/axios';
import actions from '../reducers/actions';
import { _login as Container } from '../styles/login';
import type { SubmitEvent, InputEvents } from '../../@types';
import { useAppContext } from '../context/AppContext';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

const Login: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: '', password: '' }
  );

  const handleChange = (e: InputEvents): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (formData.password.length < 6)
      return feedBack(
        setErrorMessage,
        'Password must have at least 6 characters.',
        3000
      );
    try {
      const { data } = await apiClient({
        method: 'post',
        url: '/auth/login',
        data: formData,
        withCredentials: true,
      });
      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: {
            ...state.auth,
            token: data?.accessToken,
            username: data?.username,
          },
        },
      });
      navigate('/');
    } catch (error: any) {
      console.error(error?.response?.data?.message);
      feedBack(setErrorMessage, error?.response?.data?.message, 5000);
    }
  };

  return (
    <Container>
      <header className='upper-container'>
        <h1>
          <FaBug />
          <span>Bug Tracker</span>
        </h1>
        <h5>A better way to simplify your workflow!</h5>
      </header>
      <main>
        <article>
          <div className='form-container'>
            <section className='message'>
              <h2>
                <span>Welcome back!</span>
              </h2>
            </section>
            <p>Login to your account to continue. </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>
                <FaEnvelope />
                <span>E-mail</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='Type your e-mail here.'
                required
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor='password'>
                <FaLock />
                <span>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='Type your password here.'
                onChange={(e) => handleChange(e)}
              />
              <span className='errorMessage'>{errorMessage}</span>
              <section className='actions'>
                <button className='login' type='submit'>
                  <BiLockOpen />
                  <span>Login</span>
                </button>
                <button
                  className='register'
                  onClick={() => navigate('/tab/create-account')}>
                  <BiLogIn />
                  <span>Create Account</span>
                </button>
              </section>
            </form>
            <Link to={'/tab/account-recovery'}>
              <span className='links'>
                Forgot password? Recover your account.
              </span>
            </Link>
          </div>
        </article>
      </main>
      <footer>
        <div>
          Copyright &copy; 2023 <i>Kain Nhantumbo</i>
        </div>
        <div>All Rights Reserved.</div>
      </footer>
    </Container>
  );
};

export default Login;
