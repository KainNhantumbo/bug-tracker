import { ThemeProvider } from 'styled-components';
import {
	useState,
	useEffect,
	createContext,
	ReactNode,
	useContext,
} from 'react';
import { light_default } from '../themes/light-themes';
import { dark_default } from '../themes/dark-themes';
import GlobalStylesheet from '../styles/global';

interface Props {
	children: ReactNode;
}

interface ThemeSettings {
	theme: string;
}

interface ContextProps {
	themeSwitcher: (theme: string) => void;
	controlModal: () => void;
	isModalActive: boolean;
}

export const context = createContext<ContextProps>({
	themeSwitcher: (theme: string) => {},
	isModalActive: false,
	controlModal: () => {},
});

function ThemeContext(props: Props) {
	const [currentTheme, setCurrentTheme] = useState(light_default);
	const [isModalActive, setIsModalActive] = useState(false);

	// quit the them options modal
	const controlModal = (): void => setIsModalActive((prevstate) => !prevstate);

	const loadTheme = (): void => {
		const KEY = 'ThemeSettings';
		const { theme }: ThemeSettings = JSON.parse(
			localStorage.getItem(KEY) || `{"theme":"light-default"}`
		);

		switch (theme) {
			case 'light-default':
				setCurrentTheme(light_default);
				localStorage.setItem(KEY, JSON.stringify({ theme: 'light-default' }));
				break;
			case 'dark-default':
				setCurrentTheme(dark_default);
				localStorage.setItem(KEY, JSON.stringify({ theme: 'dark-default' }));
				break;
			default:
				setCurrentTheme(light_default);
		}
	};

	const themeSwitcher = (theme: string): void => {};

	useEffect(() => {
		loadTheme();
	}, []);

	return (
		<ThemeProvider theme={currentTheme}>
			<GlobalStylesheet />
			<context.Provider
				value={{
					themeSwitcher,
					isModalActive,
					controlModal,
				}}
			>
				{props.children}
			</context.Provider>
		</ThemeProvider>
	);
}

export default ThemeContext;

export function useThemeContext(): ContextProps {
	const data = useContext(context);
	return data;
}
