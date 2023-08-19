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
import { FC, useEffect } from 'react';
import actions from '../reducers/actions';
import { useDate } from '../utils/date-functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';
import SearchBox from '../components/SearchBox';
import SortBox from '../components/SortBox';
import PromptDialogBox from '../components/PromptDialogBox';
import Loading from '../components/Loading';
import InfoBox from '../components/InfoBox';

const Main: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { fetchAPI, state, dispatch } = useAppContext();

  const fetchBugs = async (): Promise<void> => {
    dispatch({
      type: actions.LOADING,
      payload: { ...state, isLoading: true },
    });

    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: `/bugs?fields=title,status,author,createdAt,priority${
          state.queryBugs.query ? `&search=${state.queryBugs.query}` : ''
        }${state.queryBugs.sort ? `&sort=${state.queryBugs.sort}` : ''}`,
      });
      dispatch({
        type: actions.SET_BUGS_DATA,
        payload: { ...state, bugs: [...data.bugs] },
      });
      if (data.bugs.length < 1) {
        dispatch({
          type: actions.INFO_BOX_DATA,
          payload: {
            ...state,
            infoboxData: {
              ...state.infoboxData,
              message: 'You have no bug reports saved. They will appear here.',
              active: true,
              icon: VscEmptyWindow,
            },
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: actions.INFO_BOX_DATA,
        payload: {
          ...state,
          infoboxData: {
            ...state.infoboxData,
            message: 'Oops! Looks something went wrong.',
            active: true,
            actionFn: fetchBugs,
            icon: FaCat,
            buttonText: 'Reload page',
            err: error?.response?.data?.message ?? error?.code,
          },
        },
      });
      console.error(error?.response?.data?.message ?? error);
    } finally {
      dispatch({
        type: actions.LOADING,
        payload: { ...state, isLoading: false },
      });
    }
  };

  const deleteBug = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'delete',
        url: `/bugs/${state.selectedBugId}`,
      });
      fetchBugs();
      dispatch({
        type: actions.PROMPT_BOX_CONTROL,
        payload: { ...state, isPromptActive: false },
      });
      dispatch({
        type: actions.SELECTED_BUG_ID,
        payload: { ...state, selectedBugId: '' },
      });
    } catch (err: any) {
      console.error(err?.response?.data?.message ?? err);
    }
  };

  useEffect((): (() => void) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    return (): void => {
      dispatch({
        type: actions.CLEAN_UP_MODALS,
        payload: { ...state },
      });
    };
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBugs();
    }, 500);
    return (): void => clearTimeout(debounceTimer);
  }, [state.queryBugs]);

  return (
    <>
      <Header />
      <ToolBar />
      <InfoBox />
      <SearchBox />
      <ThemeDialogBox />
      <Loading />
      <SortBox />
      <PromptDialogBox
        action={deleteBug}
        prompt_title={'Delete Bug'}
        button_text={'Confirm'}
        icon={BiTrashAlt}
        prompt_message={
          'This will permanently delete selected bug report. Are you sure?'
        }
      />

      <Container>
        <article className='body'>
          <section className='bugs-wrapper'>
            <section
              className='menu'
              style={{ display: state.bugs.length < 1 ? 'none' : 'grid' }}>
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
                        dispatch({
                          type: actions.PROMPT_BOX_CONTROL,
                          payload: { ...state, isPromptActive: true },
                        });
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
