import { HeaderContainer as Container } from '../styles/components/header';
import {
	BiLogOut,
	BiPowerOff,
	FaBug,
	HiAdjustments,
	HiSparkles,
} from 'react-icons/all';
import { motion } from 'framer-motion';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PromptDialogBox from './PromptDialogBox';

export default function Header() {
	const navigate: NavigateFunction = useNavigate();
	const { pathname } = useLocation();
	const [username, setUsername] = useState<string>('');

	// picks user name fro localstorage
	const retrieveUser = (): void => {
		const { user } = JSON.parse(
			localStorage.getItem('accessToken') || `{"user":"Unknown"}`
		);
		setUsername(user);
	};

	// logout functions
	const [isLogOutActive, setIsLogOutActive] = useState(false);
	const logOutBoxController = (): void =>
		setIsLogOutActive((prevState) => !prevState);

	const logOut = (): void => {
		localStorage.removeItem('accessToken');
		navigate('/tab/login');
	};

	useEffect(() => {
		retrieveUser();
	}, []);

	return (
		<Container>
			<PromptDialogBox
				prompt_title='Log out'
				prompt_message='Do you really want to log out?'
				button_text='Log out'
				active={isLogOutActive}
				icon={<BiPowerOff />}
				action={logOut}
				quit={logOutBoxController}
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
					<span>Hi {username}!</span>
				</h5>
				<div className='actions'>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='user'
						title='Settings and adjustments'
						onClick={() => {
							if (pathname === '/tab/adjustments') return;
							navigate('/tab/adjustments');
						}}
					>
						<HiAdjustments />
					</motion.button>

					<motion.button
						className='user'
						title='Log out'
						whileTap={{ scale: 0.9 }}
						onClick={logOutBoxController}
					>
						<BiLogOut />
					</motion.button>
				</div>
			</section>
		</Container>
	);
}
