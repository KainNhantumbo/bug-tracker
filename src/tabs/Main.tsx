import {
	HiBackspace,
	BiTrashAlt,
	VscEmptyWindow,
	FaCat,
	FaParachuteBox,
	HiDotsHorizontal,
	HiX,
} from 'react-icons/all';
import { MainContainer as Container } from '../styles/main';
import { useEffect, useReducer } from 'react';
import { reducer, initialState } from '../reducers/mainReducer';
import { ActionTypes } from '../reducers/actions';
import { useDate } from '../utils/date-functions';
import { SubmitEvent } from '../types/form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useInfoBoxContext } from '../context/InfoBoxContext';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import SearchBox from '../components/SearchBox';
import SortBox from '../components/SortBox';
import useConnectAPI from '../hooks/fetch';
import PromptDialogBox from '../components/PromptDialogBox';
import Loading from '../components/Loading';
import InfoBox from '../components/InfoBox';

export default function Main(): JSX.Element {
	const { setInfo } = useInfoBoxContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate: NavigateFunction = useNavigate();
	// core functions---------------------------------------------
	const getBugsData = async (): Promise<void> => {
		setInfo((prevState) => ({ ...prevState, active: false }));
		dispatch({
			type: ActionTypes.LOADING,
			payload: { ...state, isLoading: true },
		});
		try {
			const { data } = await useConnectAPI({
				method: 'get',
				url: '/bugs?fields=title,status,author,createdAt,priority',
			});
			dispatch({
				type: ActionTypes.SET_BUGS_DATA,
				payload: { ...state, bugsData: [...data.bugs] },
			});
			if (data.bugs.length < 1) {
				setInfo({
					message: 'You have no bug reports saved. They will appear here.',
					active: true,
					icon: <VscEmptyWindow />,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ActionTypes.LOADING,
				payload: { ...state, isLoading: false },
			});
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
	const promptBoxController = (): void => {
		dispatch({ type: ActionTypes.PROMPT_BOX_CONTROL });
	};

	const deleteBug = async (): Promise<void> => {
		try {
			await useConnectAPI({
				method: 'delete',
				url: `/bugs/${state.selectedBugID}`,
			});
			promptBoxController();
			getBugsData();
			dispatch({
				type: ActionTypes.SELECTED_BUG_ID,
				payload: { ...state, selectedBugID: '' },
			});
		} catch (err: any) {
			console.error(err.response?.data?.message || err);
		}
	};

	// search functions-----------------------------------------
	const searchBoxController = (): void => {
		dispatch({ type: ActionTypes.SEARCH_BOX_CONTROL });
	};

	const handleSearch = async (e: SubmitEvent): Promise<void> => {
		e.preventDefault();
		setInfo((prevState) => ({ ...prevState, active: false }));
		dispatch({
			type: ActionTypes.LOADING,
			payload: { ...state, isLoading: true },
		});
		try {
			const { data } = await useConnectAPI({
				method: 'get',
				url: `/bugs?search=${state.searchValue}&fields=title,status,author,createdAt,priority`,
			});
			dispatch({
				type: ActionTypes.SET_BUGS_DATA,
				payload: { ...state, bugsData: [...data.bugs] },
			});

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
			dispatch({
				type: ActionTypes.LOADING,
				payload: { ...state, isLoading: false },
			});
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
		dispatch({ type: ActionTypes.SORT_BOX_CONTROL });
	};

	const handleSort = async (option: string): Promise<void> => {
		try {
			setInfo((prevState) => ({ ...prevState, active: false }));
			dispatch({
				type: ActionTypes.LOADING,
				payload: { ...state, isLoading: true },
			});
			const { data } = await useConnectAPI({
				method: 'get',
				url: `/bugs?sort=${option}&fields=title,status,author,createdAt,priority`,
			});
			dispatch({
				type: ActionTypes.SET_BUGS_DATA,
				payload: { ...state, bugsData: [...data.bugs] },
			});
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
			dispatch({ type: ActionTypes.CLEAN_UP_MODALS });
			setInfo((prevState) => ({ ...prevState, active: false }));
		};
	}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<Loading active={state.isLoading} />
			<ToolBar
				openSearchBoxFn={searchBoxController}
				openSortBoxFn={sortBoxController}
				itemsCount={state.bugsData.length}
			/>
			<SearchBox
				active={state.isSearchActive}
				stateFn={dispatch}
				quit={searchBoxController}
				actionFn={handleSearch}
				reloadFn={getBugsData}
				state={state}
			/>

			<InfoBox />

			<SortBox
				fn={handleSort}
				quit={sortBoxController}
				active={state.isSortActive}
			/>

			<PromptDialogBox
				active={state.isPromptActive}
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
							style={{ display: state.bugsData.length == 0 ? 'none' : 'grid' }}
						>
							<section>
								<span>Bug reports</span>{' '}
							</section>
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
						<section className='bugs-container'>
							{state.bugsData.length > 0 &&
								state.bugsData.map((bug) => (
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
											<label>
												<span>Author:</span>
												{'   '}
											</label>
											{bug.author}
										</div>
										<div className='status'>
											<label>
												<span>Status:</span>
												{'   '}
											</label>
											<span>{bug.status}</span>
										</div>
										<div className='priority'>
											<label>
												<span>Priority:</span>
												{'   '}
											</label>
											<span>{bug.priority}</span>
										</div>
										<div className='created'>
											<label>
												<span>Created:</span>
												{'   '}
											</label>
											<span>{useDate(bug.createdAt, 'L')}</span>
										</div>
										<div
											title='Delete bug'
											className='action-dots'
											id={bug._id}
											onClick={() => {
												dispatch({
													type: ActionTypes.SELECTED_BUG_ID,
													payload: { ...state, selectedBugID: bug._id },
												});
												promptBoxController();
											}}
										>
											<HiBackspace className='icon-a' />
											<HiX className='icon-b' />
										</div>
									</section>
								))}
						</section>
						{state.bugsData.length > 0 && (
							<div className='end-mark'>
								<HiDotsHorizontal />
							</div>
						)}
					</section>
				</article>
			</Container>
		</>
	);
}
