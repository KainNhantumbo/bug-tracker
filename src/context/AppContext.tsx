import { useState, createContext, ReactNode, ContextType } from 'react';

interface Props {
	children: ReactNode;
}

interface ContextProps {}

const context = createContext({});

export default function AppContext(props: Props) {
	return <context.Provider value={{}}>{props.children}</context.Provider>;
}
