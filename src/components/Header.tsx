import { useState } from 'react';
import { HeaderContainer as Container } from '../styles/components/header';
import {
	BiSearch,
	FaBug,
	FaQuestionCircle,
	FaUserCircle,
	HiAdjustments,
	HiColorSwatch,
} from 'react-icons/all';
import type { SubmitEvent } from '../types/form';
import { useThemeContext } from '../context/ThemeContext';

export default function Header() {
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
					<button className='user' title='Account'>
						<FaUserCircle />
					</button>
					<button className='user' title='Settings'>
						<HiAdjustments />
					</button>
					<button className='help' title='Help'>
						<FaQuestionCircle />
						<span>Help</span>
					</button>
					<button
						className='themes'
						title='Choose theme'
						onClick={controlModal}
					>
						<HiColorSwatch /> <span>Theme</span>
					</button>
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
