import { HeaderContainer as Container } from '../styles/components/header';
import { FaBug, HiAdjustments, HiColorSwatch } from 'react-icons/all';
import { useThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
	const navigate: NavigateFunction = useNavigate();
	const { pathname } = useLocation();
	const { controlModal } = useThemeContext();

	return (
		<Container>
			<section className='mark'>
				<h1>
					<FaBug />
					<span>Bug Tracker</span>
				</h1>
			</section>
			<section className='side-back'>
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
						className='themes'
						title='Choose application theme'
						whileTap={{ scale: 0.9 }}
						onClick={controlModal}
					>
						<HiColorSwatch /> <span>Theme</span>
					</motion.button>
				</div>
			</section>
		</Container>
	);
}
