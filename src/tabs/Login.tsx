import { useState } from 'react';
import { LoginContainer as Container } from '../styles/login';
import type { SubmitEvent, InputEvents } from '../types/form';
import {
  FaLock,
  BiLogIn,
  FaBug,
  BiLockOpen,
  FaEnvelope,
} from 'react-icons/all';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';
import feedBack from '../utils/feedback';

interface UserData {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState<UserData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate: NavigateFunction = useNavigate();

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
      const { data: user } = await apiClient({
        method: 'post',
        url: '/auth/login',
        data: formData,
      });
      localStorage.setItem(
        'accessToken',
        JSON.stringify({ token: user.accessToken, user: user.username })
      );
      navigate('/');
    } catch (err: any) {
      console.log(err.response?.data?.message);
      feedBack(setErrorMessage, err.response?.data?.message, 5000);
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
                  onClick={() => navigate('/tab/create-account')}
                >
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
          Copyright &copy; 2022 <i>Kain Nhantumbo</i>
        </div>
        <div>All Rights Reserved.</div>
      </footer>
    </Container>
  );
}
