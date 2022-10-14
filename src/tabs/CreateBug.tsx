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
import NavigationBar from '../components/NavigationBar';
import ThemeDialogBox from '../components/ThemeDialogBox';
import feedBack from '../utils/feedback';
import { fetchAPI } from '../utils/fetch-client';
import Loading from '../components/Loading';
import { useInfoBoxContext } from '../context/InfoBoxContext';
import { useState, useEffect } from 'react';
import { InputEvents, SubmitEvent } from '../types/form';
import { CreateBugContainer as Container } from '../styles/create-bug';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

interface DataProps {
  title: string;
  feature: string;
  priority: string;
  description: string;
  author: string;
  status: string;
  associated: string;
  notes: string;
}

export default function CreateBug(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  // loading states-------------
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { setInfo } = useInfoBoxContext();
  // core states----------------
  const [issueData, setIssueData] = useState<DataProps>({
    title: '',
    feature: '',
    priority: 'low',
    description: '',
    author: '',
    status: 'in progress',
    associated: '',
    notes: '',
  });

  // picks data from inputs
  const handleChange = (e: InputEvents): void => {
    setIssueData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { id } = useParams();
  const isUpdate = id !== ':id';

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await fetchAPI({
          method: 'patch',
          url: `/bugs/${id}`,
          data: issueData,
        });
        navigate('/');
        return;
      }
      await fetchAPI({ method: 'post', url: '/bugs', data: issueData });
      navigate('/');
    } catch (err: any) {
      console.log(err.response.data?.message);
      feedBack(setErrorMessage, err.response.data?.message, 5000);
    }
  };

  // gets bug data to fill the fields
  const getBugData = async (): Promise<void> => {
    if (!isUpdate) return;
    setInfo((prevState) => ({ ...prevState, active: false }));
    setIsLoading(true);
    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: `/bugs/${id}`,
      });
      setIssueData(data.bug);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setInfo({
        message: 'Oops! Looks something went wrong.',
        active: true,
        actionFn: getBugData,
        icon: <FaCat />,
        buttonText: 'Refresh and try again',
        err: err.response?.data?.message || err.code,
      });
      console.log(err.response?.data?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    getBugData();
    if (!isUpdate) setIsLoading(false);
    // function called to avoid memory leaks
    return () => {
      setIsLoading(false);
      setInfo((prevState) => ({ ...prevState, active: false }));
    };
  }, []);

  return (
    <>
      <Header />
      <ThemeDialogBox />
      <Loading active={isLoading} />
      <NavigationBar
        locationName={isUpdate ? 'View & Update Bug' : 'Create Bug'}
        icon={<VscIssueDraft />}
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
                  value={issueData.title}
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
                    value={issueData.status}
                    onChange={handleChange}
                    defaultChecked={true}
                  >
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
                    value={issueData.priority}
                    onChange={handleChange}
                    defaultChecked={true}
                  >
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
                    value={issueData.author}
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
                    value={issueData.associated}
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
                  value={issueData.feature}
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
                  value={issueData.description}
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
                  value={issueData.notes}
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
}
