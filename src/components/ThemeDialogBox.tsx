import { ThemeDialog as Container } from '../styles/components/theme-dialog-box';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FiX,
	FaSort,
	FaCookie,
	HiColorSwatch,
	HiCubeTransparent,
} from 'react-icons/all';
import { useThemeContext } from '../context/ThemeContext';

interface ThemeData {
	name: string;
	code: string;
}

export default function ThemeDialogBox(): JSX.Element {
	const { controlModal, isModalActive, themeSwitcher } = useThemeContext();

	const ThemeOptions: ThemeData[] = [
		{ code: 'light-default', name: 'Light (Default)' },
		{ code: 'dark-default', name: 'Dark (Default)' },
		{ code: 'dark-rumble', name: 'Dark Rumble' },
		{ code: 'dark-drackula', name: 'Dark Drackula' },
	];

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
									<HiColorSwatch />
									<span>Choose Theme</span>
								</h2>
								<button className='quit' title='Close' onClick={controlModal}>
									<FiX />
								</button>
							</div>
							<section className='prompt-info'>
								{ThemeOptions.map((option) => (
									<motion.div
										whileHover={{ scale: 1.04 }}
										whileTap={{ scale: 0.8 }}
										key={option.name}
										onClick={() => {
											controlModal();
											themeSwitcher(option.code);
										}}
									>
										<HiCubeTransparent />
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
