import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import { MainContainer as Container } from '../styles/main';
import SearchBox from '../components/SearchBox';
import { SubmitEvent } from '../types/form';
import SortBox from '../components/SortBox';

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
	const [isSortActive, setIsSortActive] = useState(false);
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

	const searchBug = async (e: SubmitEvent): Promise<void> => {
		e.preventDefault();
	};

	const searchBoxController = (): void =>
		setisSearchActive((prevState) => !prevState);

	const sortBoxController = (): void =>
		setIsSortActive((prevState) => !prevState);

	const handleSort = async (option: string): Promise<void> => {};

	useEffect(() => {
		// cleanup function
		return () => {
			setisSearchActive(false);
		};
	}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<ToolBar
				openSearchBoxFn={searchBoxController}
				openSortBoxFn={sortBoxController}
			/>
			<SearchBox
				active={isSearchActive}
				stateFn={setSearchValue}
				quit={searchBoxController}
				actionFn={searchBug}
			/>
			<SortBox fn={handleSort} quit={sortBoxController} active={isSortActive} />
			<Container></Container>
		</>
	);
}
