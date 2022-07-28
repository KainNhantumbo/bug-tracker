import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import { MainContainer as Container } from '../styles/main';

interface Data {
	name: string;
	createdAt: string;
	updatedAt: string;
	author: string;
	status: string;
	priority: string;
	// description: string
	// email: string
	// type: string
}

export default function Main(): JSX.Element {
	const [bugsData, setBugsData] = useState<Data[]>([
		{
			name: '',
			createdAt: '',
			updatedAt: '',
			author: '',
			status: '',
			priority: '',
		},
	]);

	const getBugsData = async (): Promise<void> => {};
	const deleteBug = async (): Promise<void> => {};
	const updateBug = async (): Promise<void> => {};

	useEffect(() => {}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<ToolBar />
			<Container></Container>
		</>
	);
}
