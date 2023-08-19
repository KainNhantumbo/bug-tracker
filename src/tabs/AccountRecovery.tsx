import {
  FaEnvelope,
  FaLock,
  FaUnlock,
  FaBug,
  BiLogIn,
  BiLockOpen,
  FaKey,
} from 'react-icons/all';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CreateAccountContainer as Container } from '../styles/create-account';
import type { SubmitEvent, InputEvents } from '../../@types';
import feedback from '../utils/feedback';
import { apiClient } from '../api/axios';

interface IUserData {
  password: string;
  confirm_password: string;
  user_email: string;
  recouvery_key: string;
}

export default function AccountRecovery(): JSX.Element {
  const [formData, setFormData] = useState<IUserData>({
    password: '',
    confirm_password: '',
    user_email: '',
    recouvery_key: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate: NavigateFunction = useNavigate();

  const handleChange = (e: InputEvents): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password)
      return feedback(
        setErrorMessage,
        'Passwords must match each other.',
        3000
      );

    try {
      await apiClient({
        method: 'post',
        url: '/auth/recovery',
        data: formData,
      });
      navigate(`/tab/message/recover/:id`);
    } catch (err: any) {
      console.log(err.response?.data?.message);
      feedback(setErrorMessage, err.response.data?.message, 5000);
    }
  };

  return (
    <Container>
      <header className='upper-container'>
        <section className='logo'>
          <h1>
            <FaBug />
            <span>Bug Tracker</span>
          </h1>
        </section>
        <section className='slogan'>
          <h2>
            <span>Get things done in efficacious and optimized way</span>
          </h2>
        </section>
      </header>
      <main>
        <article>
          <div className='form-container'>
            <section className='message'>
              <h2>
                <span>Get your account back on work!</span>
              </h2>
            </section>

            <form onSubmit={handleSubmit}>
              <section className='form-section'>
                <div className='form-element'>
                  <label>
                    <FaKey />
                    <span>Recovery Key</span>
                  </label>
                  <input
                    type='password'
                    placeholder='Type your recovery key'
                    name='recovery_key'
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className='form-element'>
                  <label>
                    <FaEnvelope />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Type your e-mail'
                    name='user_email'
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </section>

              <section className='form-section'>
                <div className='form-element'>
                  <label>
                    <FaUnlock />
                    <span>New Password</span>
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Type a new password'
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className='form-element'>
                  <label>
                    <FaLock />
                    <span>Confirm Password</span>
                  </label>
                  <input
                    type='password'
                    name='confirm_password'
                    placeholder='Confirm your password.'
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </section>

              <span className='errorMessage'>{errorMessage}</span>

              <section className='actions'>
                <button className='next' type='submit'>
                  <BiLogIn />
                  <span>Submit</span>
                </button>
                <button
                  className='login'
                  onClick={() => navigate('/tab/login')}
                >
                  <BiLockOpen />
                  <span>Login</span>
                </button>
              </section>
            </form>
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
