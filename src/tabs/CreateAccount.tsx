import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CreateAccountContainer as Container } from '../styles/create-account';
import {
	FaEnvelope,
	FaLock,
	FaUnlock,
	FaUnlockAlt,
	FaUser,
	FaUserEdit,
	BiLogInCircle,
} from 'react-icons/all';
import type { SubmitEvent, InputEvents } from '../types/form';
import feedback from '../utils/feedback';
import api from '../api/axios';

interface UserData {
	password: string;
	confirm_password: string;
	email: string;
	user_name: string;
	last_name: string;
	first_name: string;
}

export default function CreateAccount(): JSX.Element {
	const [formData, setFormData] = useState<UserData>({
		password: '',
		confirm_password: '',
		email: '',
		user_name: '',
		last_name: '',
		first_name: '',
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

		if (formData.password.length < 6)
			return feedback(
				setErrorMessage,
				'Password must have at least 6 characters.',
				3000
			);

		try {
			const { data: user } = await api({
				method: 'post',
				url: '/auth/register',
				data: formData,
			});
			localStorage.setItem(
				'accessToken',
				JSON.stringify({ token: user.token })
			);
			navigate('/company-setup');
		} catch (err: any) {
			console.log(err.message);
			feedback(setErrorMessage, err.response.data.message, 3000);
		}
	};

	return (
		<Container>
			<header className='upper-container'>
				<section className='logo'>
					<h1>
						<span>Marketeer</span>
					</h1>
				</section>
				<section className='slogan'>
					<h2>
						<span>Market Management</span>
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
						<p>Register a new administrative account. </p>

						<form onSubmit={handleSubmit}>
							<section className='form-section'>
								<div className='form-element'>
									<label>
										<FaUserEdit />
										<span>First name</span>
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
										<span>Last name</span>
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
										<span>Username</span>
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
										<span>E-mail</span>
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
										<span>Password</span>
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
									<BiLogInCircle />
									<span>Next</span>
								</button>
								<button className='login' onClick={() => navigate('/login')}>
									<FaUnlockAlt />
									<span>Login</span>
								</button>
							</section>
						</form>
					</div>
				</article>
			</main>
			<footer>
				<div>
					Copyright &copy; 2022 <i>Marketeer Systems</i>
				</div>
				<div>All Rights Reserved.</div>
			</footer>
		</Container>
	);
}
