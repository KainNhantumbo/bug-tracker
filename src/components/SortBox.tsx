import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSortAlt2, FiX, HiSelector } from 'react-icons/all';
import { SortBoxContainer as Container } from '../styles/components/sort-box';
interface Props {
	active: boolean;
	quit: () => void;
	fn: (param: string) => void;
}

interface SortProps {
	code: string;
	name: string;
}

const SortOptions: SortProps[] = [
	{ code: 'title', name: 'Title' },
	{ code: '-title', name: 'Title (descending)' },
	{ code: 'reporter', name: 'Reporter' },
	{ code: '-reporter', name: 'Reporter (descending)' },
	{ code: 'status', name: 'Status' },
	{ code: '-status', name: 'Status (descending)' },
	{ code: 'createdAt', name: 'Created' },
	{ code: '-createdAt', name: 'Created (descending)' },
];

export default function SortBox(props: Props): JSX.Element {
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
						initial={{ y: -290 }}
						animate={{ y: 0, transition: { duration: 0.3 } }}
						exit={{ y: -290, transition: { duration: 0.3 } }}
					>
						<section className='dialog-prompt'>
							<div className='top'>
								<h2>
									<BiSortAlt2 />
									<span>Sort by</span>
								</h2>
								<button className='quit' title='Close' onClick={props.quit}>
									<FiX />
								</button>
							</div>
							<section className='prompt-info'>
								{SortOptions.map((option) => (
									<motion.div
										whileHover={{ scale: 1.04 }}
										whileTap={{ scale: 0.8 }}
										key={option.code}
										onClick={() => {
											props.quit();
											props.fn(option.code);
										}}
									>
										<HiSelector />
										<span>{option.name}</span>
									</motion.div>
								))}
							</section>
						</section>
					</motion.section>
				</Container>
			)}
		</AnimatePresence>
	);
}
