import { useState, createContext, ReactNode, useContext } from 'react';

interface Props {
	children: ReactNode;
}

interface ContextProps {
	userRecouveryKey: string;
	setUserRecouveryKey: React.Dispatch<React.SetStateAction<string>>;
}

const context = createContext<ContextProps>({
	userRecouveryKey: '',
	setUserRecouveryKey: () => {},
});

export default function AppContext(props: Props) {
	const [userRecouveryKey, setUserRecouveryKey] = useState<string>('');
	return (
		<context.Provider value={{ userRecouveryKey, setUserRecouveryKey }}>
			{props.children}
		</context.Provider>
	);
}

export const useAppContext = (): ContextProps => {
	return useContext(context);
};
