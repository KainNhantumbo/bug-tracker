import { ThemeDialog as Container } from '../styles/components/theme-dialog-box';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FiX,
	FaSort,
	BiSortDown,
	BiSortUp,
	BiSortZA,
	FaCookie,
} from 'react-icons/all';
import { useThemeContext } from '../context/ThemeContext';

export default function ThemeDialogBox(): JSX.Element {
	const { controlModal, isModalActive } = useThemeContext();
	return (
		<AnimatePresence>
			{isModalActive && (
				<Container
					className='main'
					onClick={(e) => {
						const target = (e as any).target.classList;
						if (target.contains('main')) {
							controlModal();
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
						<section className='dialog-prompt'>
							<div className='top'>
								<h2>
									<FaSort />
									<span>Choose App Theme</span>
								</h2>
								<button className='quit' title='Close' onClick={controlModal}>
									<FiX />
								</button>
							</div>
							<section className='prompt-info'>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<FaCookie />
									<span>Name</span>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<BiSortZA />
									<span>Name (ascending)</span>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<BiSortDown />
									<span>Created At</span>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<BiSortUp />
									<span>Created At (ascending)</span>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<BiSortDown />
									<span>Updated At</span>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.8 }}
									onClick={() => {
										controlModal();
									}}
								>
									<BiSortUp />
									<span>Updated At (ascending)</span>
								</motion.div>
							</section>
						</section>
					</motion.section>
				</Container>
			)}
		</AnimatePresence>
	);
}
