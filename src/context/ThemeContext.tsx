import { ThemeProvider } from 'styled-components';
import { useState, useEffect, createContext, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function ThemeContext(props: Props) {
	return <ThemeProvider theme={{}}>{props.children}</ThemeProvider>;
}

export default ThemeContext;
