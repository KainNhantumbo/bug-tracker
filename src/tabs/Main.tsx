import {
  HiBackspace,
  BiTrashAlt,
  VscEmptyWindow,
  FaCat,
  FaParachuteBox,
  HiDotsHorizontal,
  HiX,
} from 'react-icons/all';
import { _main as Container } from '../styles/main';
import { FC, useEffect, useReducer } from 'react';
import { reducer, initialState } from '../reducers/reducer';
import actions from '../reducers/actions';
import { useDate } from '../utils/date-functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useInfoBoxContext } from '../context/InfoBoxContext';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import SearchBox from '../components/SearchBox';
import SortBox from '../components/SortBox';
import PromptDialogBox from '../components/PromptDialogBox';
import Loading from '../components/Loading';
import InfoBox from '../components/InfoBox';
import { SubmitEvent } from '../../@types';

const Main: FC = (): JSX.Element => {
  const { fetchAPI } = useAppContext();
  const { setInfo } = useInfoBoxContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate: NavigateFunction = useNavigate();

  // core functions---------------------------------------------
  const fetchBugs = async (): Promise<void> => {
    setInfo((prevState) => ({ ...prevState, active: false }));
    dispatch({
      type: actions.LOADING,
      payload: { ...state, isLoading: true },
    });

    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: '/bugs?fields=title,status,author,createdAt,priority',
      });
      dispatch({
        type: actions.SET_BUGS_DATA,
        payload: { ...state, bugs: [...data.bugs] },
      });
      if (data.bugs.length < 1) {
        setInfo({
          message: 'You have no bug reports saved. They will appear here.',
          active: true,
          icon: <VscEmptyWindow />,
        });
      }
    } catch (error: any) {
      setInfo({
        message: 'Oops! Looks something went wrong.',
        active: true,
        actionFn: fetchBugs,
        icon: <FaCat />,
        buttonText: 'Reload page',
        err: error?.response?.data?.message ?? error?.code,
      });
      console.error(error?.response?.data?.message ?? error);
    } finally {
      dispatch({
        type: actions.LOADING,
        payload: { ...state, isLoading: false },
      });
    }
  };

  // delete bug functions-------------------------------------
  const promptBoxController = (): void => {
    dispatch({
      type: actions.PROMPT_BOX_CONTROL,
      payload: { ...state, isPromptActive: !state.isPromptActive },
    });
  };

  const deleteBug = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'delete',
        url: `/bugs/${state.selectedBugId}`,
      });
      promptBoxController();
      fetchBugs();
      dispatch({
        type: actions.SELECTED_BUG_ID,
        payload: { ...state, selectedBugId: '' },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  // search functions-----------------------------------------
  const searchBoxController = (): void => {
    dispatch({
      type: actions.SEARCH_BOX_CONTROL,
      payload: { ...state, isSearchActive: !state.isSearchActive },
    });
  };

  const handleSearch = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    setInfo((prevState) => ({ ...prevState, active: false }));
    dispatch({
      type: actions.LOADING,
      payload: { ...state, isLoading: true },
    });
    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: `/bugs?search=${state.searchValue}&fields=title,status,author,createdAt,priority`,
      });
      dispatch({
        type: actions.SET_BUGS_DATA,
        payload: { ...state, bugs: [...data.bugs] },
      });

      if (data.bugs.length < 1) {
        setInfo({
          message: 'No reports matched your search criteria.',
          active: true,
          icon: <FaParachuteBox />,
          buttonText: 'Reload page',
          actionFn: fetchBugs,
        });
      }
    } catch (err: any) {
      dispatch({
        type: actions.LOADING,
        payload: { ...state, isLoading: false },
      });
      setInfo({
        message: 'Oops! Looks something went wrong.',
        active: true,
        actionFn: fetchBugs,
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
    dispatch({
      type: actions.SORT_BOX_CONTROL,
      payload: { ...state, isSortActive: !state.isSortActive },
    });
  };

  const handleSort = async (option: string): Promise<void> => {
    try {
      setInfo((prevState) => ({ ...prevState, active: false }));
      dispatch({
        type: actions.LOADING,
        payload: { ...state, isLoading: true },
      });
      const { data } = await fetchAPI({
        method: 'get',
        url: `/bugs?sort=${option}&fields=title,status,author,createdAt,priority`,
      });
      dispatch({
        type: actions.SET_BUGS_DATA,
        payload: { ...state, bugs: [...data.bugs] },
      });
    } catch (err: any) {
      setInfo({
        message: 'Oops! Looks something went wrong.',
        active: true,
        actionFn: fetchBugs,
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
    fetchBugs();
    // corrects the windows Yaxis position
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // cleanup function to prevent memory leaks
    return () => {
      dispatch({
        type: actions.CLEAN_UP_MODALS,
        payload: { ...state },
      });
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
        itemsCount={state.bugs.length}
      />
      <SearchBox
        active={state.isSearchActive}
        stateFn={dispatch}
        quit={searchBoxController}
        actionFn={handleSearch}
        reloadFn={fetchBugs}
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
              style={{ display: state.bugs.length == 0 ? 'none' : 'grid' }}>
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
              {state.bugs.length > 0 &&
                state.bugs.map((bug) => (
                  <section
                    className='bug'
                    key={bug._id}
                    onClick={(e) => {
                      const classList = (e as any).target.classList.contains(
                        'action-dots'
                      );
                      if (!classList)
                        return navigate(`/tab/create-bug/${bug._id}`);
                    }}>
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
                          type: actions.SELECTED_BUG_ID,
                          payload: { ...state, selectedBugId: bug._id },
                        });
                        promptBoxController();
                      }}>
                      <HiBackspace className='icon-a' />
                      <HiX className='icon-b' />
                    </div>
                  </section>
                ))}
            </section>
            {state.bugs.length > 0 && (
              <div className='end-mark'>
                <HiDotsHorizontal />
              </div>
            )}
          </section>
        </article>
      </Container>
    </>
  );
};

export default Main;
