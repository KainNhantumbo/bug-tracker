import { useState } from 'react';
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
				<Container
					className='main'
					onClick={(e) => {
						const target = (e as any).target.classList;
						if (target.contains('main')) {
							props.quit();
						}
					}}
				>
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
						exit={{ opacity: 0, scale: 0 }}
					>
						<div className='dialog-prompt'>
							<div className='prompt-info'>
								<span className='prompt-title'>Edit Account </span>
								<p className='prompt-message'>
									Here you can modify your account.
								</p>

								<section className='content-container'>
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
									</form>
								</section>
							</div>
							<div className='prompt-actions'>
								<button className='prompt-cancel' onClick={props.quit}>
									<HiArrowLeft />
									<span>Cancel</span>
								</button>
								<button className='prompt-accept' type={'submit'}>
									<HiCheck />
									<span>Update</span>
								</button>
							</div>
						</div>
					</motion.section>
				</Container>
			)}
		</AnimatePresence>
	);
}

export default EditAccountBox;
