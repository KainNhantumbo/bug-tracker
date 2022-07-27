import { useState } from 'react';
import { HeaderContainer as Container } from '../styles/components/header';

export default function Header() {
	return (
		<Container>
			<section className='mark'>
				<h1>
					<span>Bug Tracker</span>
				</h1>
			</section>
		</Container>
	);
}
