import {
	HiBackspace,
	BiTrashAlt,
	VscEmptyWindow,
	FaCat,
	FaParachuteBox,
} from 'react-icons/all';
import { MainContainer as Container } from '../styles/main';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import SearchBox from '../components/SearchBox';
import { SubmitEvent } from '../types/form';
import SortBox from '../components/SortBox';
import FilterBox from '../components/FilterBox';
import useConnectAPI from '../hooks/fetch';
import PromptDialogBox from '../components/PromptDialogBox';
import { useDate } from '../utils/date-functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import InfoBox from '../components/InfoBox';
import { useInfoBoxContext } from '../context/InfoBoxContext';

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
	// modal state control--------
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [isSortActive, setIsSortActive] = useState(false);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const [isPromptActive, setIsPromptActive] = useState(false);
	// loading states-------------
	const [isLoading, setIsLoading] = useState(false);
	const { info, setInfo } = useInfoBoxContext();
	// core states----------------
	const [searchValue, setSearchValue] = useState('');
	const [bugsData, setBugsData] = useState<Data[]>([]);
	const [selectedBugID, setSelectedBugID] = useState<string>('');

	// core functions---------------------------------------------
	const navigate: NavigateFunction = useNavigate();

	const getBugsData = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const { data } = await useConnectAPI({
				method: 'get',
				url: '/bugs?fields=title,status,author,createdAt,priority',
			});
			setBugsData(data.bugs);
			setIsLoading(false);
			if (data.bugs.length < 1) {
				setInfo({
					message: 'You have no bug reports saved. They will appear here.',
					active: true,
					icon: <VscEmptyWindow />,
				});
			}
		} catch (err: any) {
			setIsLoading(false);
			setInfo({
				message: 'Oops! Looks something went wrong.',
				active: true,
				actionFn: getBugsData,
				icon: <FaCat />,
				buttonText: 'Reload page',
				err: err.response?.data?.message || err.code,
			});
			console.log(err.response?.data?.message);
			console.log(err);
		}
	};

	// delete bug functions-------------------------------------
	const promptBoxController = (): void =>
		setIsPromptActive((prevState) => !prevState);

	const deleteBug = async (): Promise<void> => {
		try {
			await useConnectAPI({ method: 'delete', url: `/bugs/${selectedBugID}` });
			promptBoxController();
			getBugsData();
			setSelectedBugID('');
		} catch (err: any) {
			console.error(err.response?.data?.message);
			console.error(err);
		}
	};

	// search functions-----------------------------------------
	const searchBoxController = (): void => {
		setIsFilterActive(false);
		setIsSortActive(false);
		setIsSearchActive((prevState) => !prevState);
	};

	const handleSearch = async (e: SubmitEvent): Promise<void> => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const { data } = await useConnectAPI({
				method: 'get',
				url: `/bugs?search=${searchValue}&fields=title,status,author,createdAt,priority`,
			});
			setBugsData([...data.bugs]);
			setIsLoading(false);
			if (data.bugs.length < 1) {
				setInfo({
					message: 'No reports matched your search criteria.',
					active: true,
					icon: <FaParachuteBox />,
					buttonText: 'Reload page',
					actionFn: getBugsData,
				});
			}
		} catch (err: any) {
			setInfo({
				message: 'Oops! Looks something went wrong.',
				active: true,
				actionFn: getBugsData,
				icon: <FaCat />,
				buttonText: 'Reload page',
				err: err.response?.data?.message || err.code,
			});
			console.error(err.message);
			console.error(err.response?.data?.message);
		}
	};

	// sort functions--------------------------------------
	const sortBoxController = (): void => {
		setIsFilterActive(false);
		setIsSearchActive(false);
		setIsSortActive((prevState) => !prevState);
	};

	const handleSort = async (option: string): Promise<void> => {
		try {
			setIsLoading(true);
			const { data } = await useConnectAPI({
				method: 'get',
				url: `/bugs?sort=${option}&fields=title,status,author,createdAt,priority`,
			});
			setBugsData([...data.bugs]);
			setIsLoading(false);
		} catch (err: any) {
			setInfo({
				message: 'Oops! Looks something went wrong.',
				active: true,
				actionFn: getBugsData,
				icon: <FaCat />,
				buttonText: 'Reload page',
				err: err.response?.data?.message || err.code,
			});
			console.error(err.message);
			console.error(err.response?.data?.message);
		}
	};

	// filter functions--------------------------------------
	const filterBoxController = (): void =>
		setIsFilterActive((prevState) => !prevState);

	const handleFilter = async (option: string): Promise<void> => {};

	// ---------*--------------*-------------*------------//
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
			setIsPromptActive(false);
			setIsSearchActive(false);
			setIsFilterActive(false);
			setIsSortActive(false);
			setInfo((prevState) => ({ ...prevState, active: false }));
		};
	}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<Loading active={isLoading} />
			<ToolBar
				openSearchBoxFn={searchBoxController}
				openSortBoxFn={sortBoxController}
				openFilterBoxFn={filterBoxController}
				itemsCount={bugsData.length}
			/>
			<SearchBox
				active={isSearchActive}
				stateFn={setSearchValue}
				quit={searchBoxController}
				actionFn={handleSearch}
				reloadFn={getBugsData}
			/>
			<FilterBox
				quit={filterBoxController}
				fn={handleFilter}
				active={isFilterActive}
			/>
			<InfoBox
				active={info.active}
				message={info.message}
				icon={info.icon}
				buttonText={info.buttonText}
				actionFn={info.actionFn}
				err={info.err}
				setStateFn={setInfo}
			/>

			<SortBox fn={handleSort} quit={sortBoxController} active={isSortActive} />

			<PromptDialogBox
				active={isPromptActive}
				action={deleteBug}
				prompt_title={'Delete Bug'}
				prompt_message={
					'This will permanently delete selected bug report. Are you sure?'
				}
				button_text={'Confirm'}
				icon={<BiTrashAlt />}
				quit={promptBoxController}
			/>

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
									<div title={bug.title} className='title'>
										{bug.title}
									</div>
									<div title={bug.author} className='reporter'>
										{bug.author}
									</div>
									<div className='status'>{bug.status}</div>
									<div className='priority'>{bug.priority}</div>
									<div className='created'>{useDate(bug.createdAt, 'L')}</div>
									<div
										title='Delete bug'
										className='action-dots'
										id={bug._id}
										onClick={() => {
											setSelectedBugID(bug._id);
											promptBoxController();
										}}
									>
										<HiBackspace />
									</div>
								</section>
							))}
					</section>
				</article>
			</Container>
		</>
	);
}
