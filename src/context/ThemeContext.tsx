import { ThemeProvider } from 'styled-components';
import { useState, useEffect, createContext, ReactNode } from 'react';
import { light_default } from '../themes/light-themes';

interface Props {
	children: ReactNode;
}

function ThemeContext(props: Props) {
	const [currentTheme, setCurrentTheme] = useState(light_default);
	return <ThemeProvider theme={currentTheme}>{props.children}</ThemeProvider>;
}

export default ThemeContext;
