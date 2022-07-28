import { ToolbarContainer as Container } from '../styles/components/toolbar';
import { motion } from 'framer-motion';
import {
	HiPlusSm,
	BiSortAlt2,
	HiViewGrid,
	BiFilter,
	FaBars,
} from 'react-icons/all';

export default function ToolBar(): JSX.Element {
	return (
		<Container>
			{false && (
				<motion.button
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.95 }}
					title='Add new bug issue'
					onClick={() => {}}
					className='descripted'
				>
					<FaBars />
				</motion.button>
			)}

			<motion.button
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.95 }}
				title='Submit bug'
				className='descripted'
				onClick={() => {}}
			>
				<HiPlusSm />
				<span>Create Bug</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.95 }}
				title='Sort'
				className='descripted'
				onClick={() => {}}
			>
				<BiSortAlt2 />
				<span>Sort</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.95 }}
				title='Filter'
				className='descripted'
				onClick={() => {}}
			>
				<BiFilter />
				<span>Filter</span>
			</motion.button>
			<motion.button
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.95 }}
				title='Change view'
				className='descripted'
				onClick={() => {}}
			>
				<HiViewGrid />
				<span>View</span>
			</motion.button>
		</Container>
	);
}
