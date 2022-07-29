import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import { MainContainer as Container } from '../styles/main';
import SearchBox from '../components/SearchBox';
import { SubmitEvent } from '../types/form';
import SortBox from '../components/SortBox';
import FilterBox from '../components/FilterBox';

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
	// modal state control
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [isSortActive, setIsSortActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);

	// core states
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

	// core functions
	const getBugsData = async (): Promise<void> => {};
	const deleteBug = async (): Promise<void> => {};
	const updateBug = async (): Promise<void> => {};

	// search functions
	const searchBoxController = (): void =>
		setIsSearchActive((prevState) => !prevState);

	const handleSearch = async (e: SubmitEvent): Promise<void> => {
		e.preventDefault();
	};

	// sort functions
	const sortBoxController = (): void =>
		setIsSortActive((prevState) => !prevState);

	const handleSort = async (option: string): Promise<void> => {};

	// filter functions
	const filterBoxController = (): void =>
		setIsFilterActive((prevState) => !prevState);

	const handleFilter = async (option: string): Promise<void> => {};

	useEffect(() => {
		// cleanup function to prevent memory leaks
		return () => {
			setIsSearchActive(false);
			setIsFilterActive(false);
			setIsSortActive(false);
		};
	}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<ToolBar
				openSearchBoxFn={searchBoxController}
				openSortBoxFn={sortBoxController}
				openFilterBoxFn={filterBoxController}
			/>
			<SearchBox
				active={isSearchActive}
				stateFn={setSearchValue}
				quit={searchBoxController}
				actionFn={handleSearch}
			/>
			<FilterBox
				quit={filterBoxController}
				fn={handleFilter}
				active={isFilterActive}
			/>
			<SortBox fn={handleSort} quit={sortBoxController} active={isSortActive} />

			<Container></Container>
		</>
	);
}
