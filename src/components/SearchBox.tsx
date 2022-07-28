import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBoxContainer as Container } from '../styles/components/search-box';
import { BiSearch, FiX } from 'react-icons/all';
import { SubmitEvent } from '../types/form';

interface Props {
	active: boolean;
	quit: () => void;
	actionFn: (e: SubmitEvent) => Promise<void>;
	stateFn: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBox(props: Props): JSX.Element {
	return (
		<AnimatePresence>
			{!props.active && (
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
							<div className='top'>
								<h2>
									<BiSearch />
									<span>Search</span>
								</h2>
								<button className='quit' title='Close' onClick={props.quit}>
									<FiX />
								</button>
							</div>
							<div className='prompt-info'>
								<span className='prompt-title'>Search</span>
								<form onSubmit={props.actionFn}>
									<input
										type='search'
										name='name'
										placeholder='Seach'
										onChange={(e) => props.stateFn(e.target.value)}
									/>
								</form>
							</div>
						</div>
					</motion.section>
				</Container>
			)}
		</AnimatePresence>
	);
}
