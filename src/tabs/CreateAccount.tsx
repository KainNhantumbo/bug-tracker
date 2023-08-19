import {
  FaEnvelope,
  FaLock,
  FaUnlock,
  FaUser,
  FaUserEdit,
  FaBug,
  BiLogIn,
  BiLockOpen,
} from 'react-icons/all';
import { FC, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { _createAccount as Container } from '../styles/create-account';
import type { SubmitEvent, InputEvents } from '../../@types';
import feedback from '../utils/feedback';
import { apiClient } from '../api/axios';

interface IFormData {
  password: string;
  confirm_password: string;
  email: string;
  user_name: string;
  last_name: string;
  first_name: string;
}

const CreateAccount: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<IFormData>({
    password: '',
    confirm_password: '',
    email: '',
    user_name: '',
    last_name: '',
    first_name: '',
  });

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
      const { data } = await apiClient({
        method: 'post',
        url: '/auth/register',
        data: formData,
      });
      navigate(`/tab/message/account/${data.user_recovery}`);
    } catch (err: any) {
      console.error(err?.response?.data?.message ?? err);
      feedback(setErrorMessage, err?.response?.data?.message, 5000);
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
            <span>Get things done in efficacious and optimized way.</span>
          </h2>
        </section>
      </header>
      <main>
        <article>
          <div className='form-container'>
            <section className='message'>
              <h2>
                <span>Create account</span>
              </h2>
            </section>
            <p>Register a new user account.</p>

            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </section>

              <section className='form-section'>
                <div className='form-element'>
                  <label>
                    <FaUnlock />
                    <span>
                      Password <i>*</i>
                    </span>
                  </label>
                  <input
                    type='password'
                    name='password'
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
                    placeholder='Confirm your password.'
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </section>

              <span className='errorMessage'>{errorMessage}</span>

              <section className='actions'>
                <button className='next' type='submit'>
                  <BiLogIn />
                  <span>Get started</span>
                </button>
                <button
                  className='login'
                  onClick={() => navigate('/tab/login')}>
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
          Copyright &copy; 2023 <i>Kain Nhantumbo</i>
        </div>
        <div>All Rights Reserved.</div>
      </footer>
    </Container>
  );
};

export default CreateAccount;
