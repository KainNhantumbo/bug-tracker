import { ThemeProvider } from 'styled-components';
import { useState, useEffect, ReactNode } from 'react';
import { light_default } from '../themes/light-themes';
import { dark_default } from '../themes/dark-themes';

interface Props {
	children: ReactNode;
}

interface ThemeSettings {
	theme: string;
}

function ThemeContext(props: Props) {
	const [currentTheme, setCurrentTheme] = useState(light_default);

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

	return <ThemeProvider theme={currentTheme}>{props.children}</ThemeProvider>;
}

export default ThemeContext;
