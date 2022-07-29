import { SortBoxContainer as Container } from '../styles/components/sort-box';
import { motion, AnimatePresence } from 'framer-motion';
import { BiFilter, BiFilterAlt, FiX } from 'react-icons/all';

interface Props {
	active: boolean;
	quit: () => void;
	fn: (param: string) => void;
}

interface FilterProps {
	code: string;
	name: string;
}

const FilterOptions: FilterProps[] = [
	{ code: '', name: 'Name' },
	{ code: '', name: 'Name (ascending)' },
	{ code: '', name: 'Last update' },
	{ code: '', name: 'Last update (ascending)' },
];

export default function FilterBox(props: Props): JSX.Element {
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
									<BiFilter />
									<span>Filter by</span>
								</h2>
								<button className='quit' title='Close' onClick={props.quit}>
									<FiX />
								</button>
							</div>
							<section className='prompt-info'>
								{FilterOptions.map((option) => (
									<motion.div
										whileHover={{ scale: 1.04 }}
										whileTap={{ scale: 0.8 }}
										key={option.code}
										onClick={() => {
											props.quit();
											props.fn(option.code);
										}}
									>
										<BiFilterAlt />
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
