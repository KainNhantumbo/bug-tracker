import { useState } from 'react';
import { FaEnvelope, FaLock, FaUnlock, FaUser, FaUserEdit, FiAlertTriangle, HiArrowLeft, HiCheck } from 'react-icons/all';
import { EditAccountContainer as Container } from '../styles/components/edit-account-box';
import { motion, AnimatePresence } from 'framer-motion';
import { InputEvents } from '../types/form';

interface Props {
	active: boolean;
	quit: () => void;
}

interface UserData {
	password: string;
	confirm_password: string;
	email: string;
	user_name: string;
	last_name: string;
	first_name: string;
}

function EditAccountBox(props: Props): JSX.Element {
	const [errorMessage, setErrorMessage] = useState('');
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

	const handleUpdate = async (): Promise<void> => {};

	return (
		<AnimatePresence>
			{props.active && (
				<Container>
					<section className='upper-container'>
						<h2>
							<span>Account information</span>
						</h2>
						<p>Here you can see and modify your account details.</p>
					</section>
					<article className='content-container'>
						<form onSubmit={handleUpdate}>
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
										value={accountData.first_name}
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
										value={accountData.last_name}
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
										value={accountData.user_name}
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
										value={accountData.email}

										onChange={(e) => handleChange(e)}
									/>
								</div>
							</section>

								<label>
									<FiAlertTriangle />
									<span>
										Leave these following fields blank if you don't want to
										update password.
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
										<span>Confirm Password</span>
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

							<span className='errorMessage'>{errorMessage}</span>

							<section className='actions'>
								<button className='next' onClick={props.quit}>
									<HiArrowLeft />
									<span>Cancel</span>
								</button>

								<button className='login' type={'submit'}>
									<HiCheck />
									<span>Update</span>
								</button>
							</section>
						</form>
					</article>
				</Container>
			)}
		</AnimatePresence>
	);
}

export default EditAccountBox;
