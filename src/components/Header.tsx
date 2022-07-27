import { useState } from 'react';
import { HeaderContainer as Container } from '../styles/components/header';
import {
	FaBug,
	FaQuestionCircle,
	FaSearch,
	FaUserCircle,
	HiColorSwatch,
} from 'react-icons/all';
import type { SubmitEvent } from '../types/form';

export default function Header() {
	const [searchTerm, setSearchTerm] = useState('');
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
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
					<button className='user'>
						<FaUserCircle />{' '}
					</button>
					<button className='help'>
						{' '}
						<FaQuestionCircle />
						<span>Help</span>{' '}
					</button>
					<button className='themes'>
						{' '}
						<HiColorSwatch /> <span>Theme</span>{' '}
					</button>
				</div>
				<div className='search'>
					<form onSubmit={handleSubmit}>
						<input type='search' name='name' />
						<button type='submit'>
							<FaSearch />
						</button>
					</form>
				</div>
			</section>
		</Container>
	);
}
