import {
  FaCat,
  FaNeuter,
  FaSignature,
  FaSwatchbook,
  FaUserTag,
  HiAnnotation,
  HiChartBar,
  HiCheck,
  HiFlag,
  HiPencil,
  HiPuzzle,
  IoSyncSharp,
  VscIssueDraft,
} from 'react-icons/all';
import Header from '../components/Header';
import feedBack from '../utils/feedback';
import Loading from '../components/Loading';
import { useState, useEffect, FC } from 'react';
import { useAppContext } from '../context/AppContext';
import { InputEvents, SubmitEvent, TBugData } from '../../@types';
import NavigationBar from '../components/NavigationBar';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { _createBug as Container } from '../styles/create-bug';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import actions from '../reducers/actions';

const CreateBug: FC = (): JSX.Element => {
  const { id } = useParams();
  const isUpdate: boolean = id !== ':id';
  const navigate: NavigateFunction = useNavigate();
  const { fetchAPI, state, dispatch } = useAppContext();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [bugData, setBugData] = useState<TBugData>({
    title: '',
    feature: '',
    priority: 'low',
    description: '',
    author: '',
    status: 'in progress',
    associated: '',
    notes: '',
  });

  const handleChange = (e: InputEvents): void => {
    setBugData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await fetchAPI({
          method: 'patch',
          url: `/bugs/${id}`,
          data: bugData,
        });
      } else {
        await fetchAPI({ method: 'post', url: '/bugs', data: bugData });
      }
      navigate('/');
    } catch (err: any) {
      console.error(err?.response?.data?.message ?? err);
      feedBack(setErrorMessage, err?.response.data?.message, 5000);
    }
  };

  // gets bug data to fill the fields
  const getBugData = async (): Promise<void> => {
    if (!isUpdate) return;
    dispatch({ type: actions.LOADING, payload: { ...state, isLoading: true } });
    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: `/bugs/${id}`,
      });
      setBugData((state) => ({ ...state, ...data?.bug }));
    } catch (error: any) {
      dispatch({
        type: actions.INFO_BOX_DATA,
        payload: {
          ...state,
          infoboxData: {
            ...state.infoboxData,
            message: 'Oops! Looks something went wrong.',
            active: true,
            actionFn: getBugData,
            icon: FaCat,
            buttonText: 'Refresh and try again',
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

  useEffect((): void => {
    getBugData();
  }, []);

  return (
    <>
      <Header />
      <Loading />
      <ThemeDialogBox />
      <NavigationBar
        locationName={isUpdate ? 'View & Update Bug' : 'Create Bug'}
        icon={VscIssueDraft}
      />

      <Container>
        <section className='wrapper'>
          <div className='form-container'>
            <form onSubmit={handleSubmit}>
              <div className='form-element'>
                <label>
                  <FaSignature />
                  <span>
                    Bug title <i>*</i>
                  </span>
                </label>
                <input
                  type='text'
                  placeholder='Type bug title here.'
                  name='title'
                  value={bugData.title}
                  maxLength={256}
                  required
                  onChange={handleChange}
                />
              </div>
              <section className='form-section'>
                <div className='form-element'>
                  <label>
                    <FaSwatchbook />
                    <span>Status</span>
                  </label>
                  <select
                    name='status'
                    value={bugData.status}
                    onChange={handleChange}
                    defaultChecked={true}>
                    <option value='Unknown'>Unknown</option>
                    <option value='In progress'>In progress</option>
                    <option value='Pending'>Pending</option>
                    <option value='In review'>In review</option>
                    <option value='Completed'>Completed</option>
                    <option value='Solved'>Solved</option>
                  </select>
                </div>

                <div className='form-element'>
                  <label>
                    <HiChartBar />
                    <span>Priority</span>
                  </label>
                  <select
                    name='priority'
                    value={bugData.priority}
                    onChange={handleChange}
                    defaultChecked={true}>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </section>
              <section className='form-section'>
                <div className='form-element'>
                  <label>
                    <FaUserTag />
                    <span>
                      Reporter <i>*</i>
                    </span>
                  </label>
                  <input
                    type='text'
                    placeholder='Type bug reporter.'
                    name='author'
                    value={bugData.author}
                    maxLength={64}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='form-element'>
                  <label>
                    <HiPuzzle />
                    <span>Associated to</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Type issue bug that is associated to.'
                    name='associated'
                    maxLength={256}
                    value={bugData.associated}
                    onChange={handleChange}
                  />
                </div>
              </section>

              <div className='form-element'>
                <label>
                  <HiFlag />
                  <span>Feature</span>
                </label>
                <input
                  type='text'
                  placeholder='Notice the feature that is affected by bug.'
                  name='feature'
                  maxLength={512}
                  value={bugData.feature}
                  onChange={handleChange}
                />
              </div>

              <div className='form-element'>
                <label>
                  <HiAnnotation />
                  <span>
                    Description <i>*</i>
                  </span>
                </label>
                <textarea
                  name='description'
                  maxLength={4096}
                  placeholder='Type issue description and details here.'
                  value={bugData.description}
                  required
                  onChange={handleChange}
                  rows={10}
                />
              </div>

              <div className='form-element'>
                <label>
                  <HiPencil />
                  <span>Notes</span>
                </label>
                <textarea
                  name='notes'
                  maxLength={1536}
                  placeholder='Type some notes or comments here.'
                  value={bugData.notes}
                  onChange={handleChange}
                  rows={7}
                />
              </div>

              <span className='errorMessage'>{errorMessage}</span>

              <div className='actions'>
                <button className='discard' onClick={() => navigate('/')}>
                  <FaNeuter />
                  <span>Discard</span>
                </button>
                <button className='submit' type='submit'>
                  {isUpdate ? (
                    <>
                      <IoSyncSharp />
                      <span>Update</span>
                    </>
                  ) : (
                    <>
                      <HiCheck />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default CreateBug;
