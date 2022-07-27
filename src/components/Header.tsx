import { useState } from 'react';
import { HeaderContainer as Container } from '../styles/components/header';
import {
  BiSearch,
  BiSearchAlt2,
	FaBug,
	FaQuestionCircle,
	FaSearch,
	FaUserCircle,
	HiColorSwatch,
  HiSearch,
} from 'react-icons/all';
import type { SubmitEvent } from '../types/form';

export default function Header() {
	const [searchTerm, setSearchTerm] = useState('');
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
					<button className='user'>
						<FaUserCircle />
					</button>
					<button className='help'>
						<FaQuestionCircle />
						<span>Help</span>
					</button>
					<button className='themes'>
						<HiColorSwatch /> <span>Theme</span>
					</button>
				</div>
				<div className='search'>
					<form onSubmit={handleSubmit}>
            <BiSearch/>
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
