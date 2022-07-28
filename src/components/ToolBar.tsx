import { ToolbarContainer as Container } from '../styles/components/toolbar';
import { motion } from 'framer-motion';
import {
	BiSortAlt2,
	HiViewGrid,
	BiFilter,
	FaBars,
	HiPlus,
	BiSearch,
} from 'react-icons/all';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {
	openSearchBoxFn: ()=> void
}

export default function ToolBar(props: Props): JSX.Element {
	const navigate: NavigateFunction = useNavigate();

	return (
		<Container>
			{false && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					title='Add new bug issue'
					onClick={() => {}}
					className='mono'
				>
					<FaBars />
				</motion.button>
			)}

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				title='Submit bug'
				className='descripted'
				onClick={() => navigate('/tab/create-bug/:id')}
			>
				<HiPlus />
				<span>Create Bug</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				title='Sort'
				className='descripted'
				onClick={() => {}}
			>
				<BiSortAlt2 />
				<span>Sort</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				title='Filter'
				className='descripted'
				onClick={() => {}}
			>
				<BiFilter />
				<span>Filter</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				title='Search for anything'
				className='descripted'
				onClick={props.openSearchBoxFn}
			>
				<BiSearch/>
				<span>Search</span>
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.05 }}
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
