import { useState } from 'react';
import { HeaderContainer as Container } from '../styles/components/header';
import { BiSearch, FaBug, HiAdjustments, HiColorSwatch } from 'react-icons/all';
import type { SubmitEvent } from '../types/form';
import { useThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate: NavigateFunction = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const { controlModal } = useThemeContext();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		console.log(searchTerm);
	}

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
						title='Settings and adjustments.'
						onClick={() => navigate('/tab/adjustments')}
					>
						<HiAdjustments />
					</motion.button>
					<motion.button
						className='themes'
						title='Choose theme'
						whileTap={{ scale: 0.9 }}
						onClick={controlModal}
					>
						<HiColorSwatch /> <span>Theme</span>
					</motion.button>
				</div>
				<div className='search'>
					<form onSubmit={handleSubmit}>
						<BiSearch />
						<input
							type='search'
							name='name'
							placeholder='Seach'
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</form>
				</div>
			</section>
		</Container>
	);
}
