import {
	BiSortAlt2,
	BiFilter,
	FaBars,
	HiPlus,
	BiSearch,
} from 'react-icons/all';
import { motion } from 'framer-motion';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ToolbarContainer as Container } from '../styles/components/toolbar';

interface Props {
	openSearchBoxFn: () => void;
	openSortBoxFn: () => void;
	openFilterBoxFn: () => void;
	itemsCount: number;
}

export default function ToolBar(props: Props): JSX.Element {
	const navigate: NavigateFunction = useNavigate();

	return (
		<Container>
			<section className='left-container'>
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
					onClick={props.openSortBoxFn}
				>
					<BiSortAlt2 />
					<span>Sort</span>
				</motion.button>

				{/* <motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					title='Filter'
					className='descripted'
					onClick={props.openFilterBoxFn}
				>
					<BiFilter />
					<span>Filter</span>
				</motion.button> */}

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					title='Search for anything'
					className='descripted'
					onClick={props.openSearchBoxFn}
				>
					<BiSearch />
					<span>Search</span>
				</motion.button>
			</section>

			<section className='right-container'>
				<div className='count'>
					<span>{props.itemsCount} items</span>
				</div>
			</section>
		</Container>
	);
}
