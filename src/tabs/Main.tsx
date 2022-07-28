import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import { MainContainer as Container } from '../styles/main';
import SearchBox from '../components/SearchBox';
import { SubmitEvent } from '../types/form';

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
	const [isSearchActive, setisSearchActive] = useState(false);
	const [searchValue, setSearchValue] = useState('');

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

	const searchBug = async (e: SubmitEvent): Promise<void> => {};

	const searchBoxController = (): void =>
		setisSearchActive((prevState) => !prevState);

	useEffect(() => {}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<ToolBar openSearchBoxFn={searchBoxController} />
			<SearchBox
				active={isSearchActive}
				stateFn={setSearchValue}
				quit={searchBoxController}
				actionFn={searchBug}
			/>
			<Container></Container>
		</>
	);
}
