import { LoginContainer as Container } from '../styles/login';
import { useState } from 'react';
import { FaLock, FaUser, BiLogIn, FaBug } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import type { SubmitEvent, InputEvents } from '../types/form';
import api from '../api/axios';
import feedBack from '../utils/feedback';

interface UserData {
	user_name: string;
	password: string;
}

export default function Login(): JSX.Element {
	const [formData, setFormData] = useState<UserData>({
		user_name: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

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
			const { data: user } = await api({
				method: 'post',
				url: '/auth/login',
				data: formData,
			});
			localStorage.setItem(
				'accessToken',
				JSON.stringify({ token: user.token })
			);
			navigate('/admin/dashboard');
		} catch (err: any) {
			console.log(err.message);
			feedBack(setErrorMessage, err.response.data.message, 3000);
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
									<BiLogIn />
									<span>Login</span>
								</button>
								<button
									className='register'
									onClick={() => navigate('/create-account')}
								>
									<BiLogIn />
									<span>Create Account</span>
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
