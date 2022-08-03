import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import { MainContainer as Container } from '../styles/main';
import SearchBox from '../components/SearchBox';
import { SubmitEvent } from '../types/form';
import SortBox from '../components/SortBox';
import FilterBox from '../components/FilterBox';
import useConnectAPI from '../hooks/fetch';
import { HiDotsVertical } from 'react-icons/hi';
import moment from 'moment';
import { useDate } from '../utils/date-functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface Data {
	createdAt: string;
	updatedAt: string;
	title: string;
	feature: string;
	priority: string;
	description: string;
	author: string;
	status: string;
	associated: string;
	notes: string;
	_id: string;
}

export default function Main(): JSX.Element {
	// modal state control
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [isSortActive, setIsSortActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);

	// core states
	const [searchValue, setSearchValue] = useState('');
	const [bugsData, setBugsData] = useState<Data[]>([]);

	// core functions
	const navigate: NavigateFunction = useNavigate();
	const getBugsData = async (): Promise<void> => {
		try {
			const { data } = await useConnectAPI({ method: 'get', url: '/bugs' });
			setBugsData(data.bugs);
		} catch (err: any) {
			console.log(err.response?.data?.message);
		}
	};
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

	// picks user name fro localstorage
	const retrieveUser = (): void => {
		const { user } = JSON.parse(
			localStorage.getItem('accessToken') || `{"user":"Unknown"}`
		);
		return user;
	};

	useEffect(() => {
		getBugsData();
		// corrects the windows Yaxis position
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
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

			<Container>
				<article className='body'>
					<section className='bugs-wrapper'>
						<section
							className='menu'
							style={{ display: bugsData.length == 0 ? 'none' : 'grid' }}
						>
							<div className='title'>
								<span>Title</span>
							</div>
							<div className='reporter'>
								<span>Reporter</span>
							</div>
							<div>
								<span>Status</span>
							</div>
							<div>
								<span>Priority</span>
							</div>
							<div>
								<span>Created</span>
							</div>
						</section>
						{bugsData.length > 0 &&
							bugsData.map((bug) => (
								<section
									className='bug'
									key={bug._id}
									onClick={(e) => {
										const classList = (e as any).target.classList.contains(
											'action-dots'
										);
										if (!classList)
											return navigate(`/tab/create-bug/${bug._id}`);
									}}
								>
									<div className='title'>{bug.title}</div>
									<div className='reporter'>{bug.author}</div>
									<div className='status'>{bug.status}</div>
									<div className='priority'>{bug.priority}</div>
									<div className='created'>{useDate(bug.createdAt, 'L')}</div>
									<div className='action-dots' id={bug._id}>
										<HiDotsVertical />
									</div>
								</section>
							))}
					</section>
				</article>
			</Container>
		</>
	);
}
