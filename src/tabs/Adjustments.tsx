import {
  BiTrash,
  BiTrashAlt,
  BsApp,
  FaBug,
  FaCat,
  FaCopyright,
  FaEnvelope,
  FaGithub,
  FaUser,
  FaUserCircle,
  FaUserEdit,
  GiMite,
  HiAdjustments,
  HiCode,
  HiColorSwatch,
  HiStar,
  HiViewBoards,
  SiAboutdotme,
} from 'react-icons/all';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { _adjustments as Container } from '../styles/adjustments';
import { useState, useEffect, FC } from 'react';
import Loading from '../components/Loading';
import PromptDialogBox from '../components/PromptDialogBox';
import EditAccountBox from '../components/EditAccountBox';
import { useAppContext } from '../context/AppContext';
import { useDate } from '../utils/date-functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import actions from '../reducers/actions';
import { app_metadata } from '../data/app-data';

interface IUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
}

const Adjustments: FC = (): JSX.Element => {
  const { fetchAPI, state, dispatch } = useAppContext();
  const navigate: NavigateFunction = useNavigate();
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    createdAt: '',
  });

  const deleteUser = async (): Promise<void> => {
    dispatch({
      type: actions.LOADING,
      payload: { ...state, isLoading: true },
    });
    try {
      await fetchAPI({ method: 'delete', url: `/users/${userData._id}` });
      navigate('/tab/login');
    } catch (error: any) {
      dispatch({
        type: actions.INFO_BOX_DATA,
        payload: {
          ...state,
          infoboxData: {
            ...state.infoboxData,
            message: 'Oops! Looks something went wrong.',
            active: true,
            actionFn: deleteUser,
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

  const getUserData = async (): Promise<void> => {
    dispatch({
      type: actions.LOADING,
      payload: { ...state, isLoading: true },
    });
    try {
      const { data } = await fetchAPI({ method: 'get', url: '/users' });
      setUserData({ ...data.user_data });
    } catch (error: any) {
      dispatch({
        type: actions.INFO_BOX_DATA,
        payload: {
          ...state,
          infoboxData: {
            ...state.infoboxData,
            message: 'Oops! Looks something went wrong.',
            active: true,
            actionFn: getUserData,
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
    getUserData();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <>
      <Header />
      <Loading />
      <ThemeDialogBox />
      <EditAccountBox reload={getUserData} />
      <NavigationBar locationName='Adjustments' icon={HiAdjustments} />
      <PromptDialogBox
        action={deleteUser}
        icon={BiTrashAlt}
        button_text={'Confirm'}
        prompt_title={'Delete account'}
        prompt_message={
          'This action will permanently delete your account and erase all data associated with it. Are you sure?'
        }
      />

      <Container>
        <article>
          <section className='user-container'>
            <h2 className='title'>
              <FaUserCircle />
              <span>User account</span>
            </h2>
            <section className='section-container'>
              <div title='User avatar' className='user-avatar'>
                <FaUser />
              </div>
              <div className='user-details'>
                <div className='user-info'>
                  <h3>
                    <FaUser />
                    <span>Name: </span>
                  </h3>
                  <span title='User name'>
                    {userData.first_name + ' ' + userData.last_name}
                  </span>
                </div>
                <div className='user-info'>
                  <h3>
                    <FaEnvelope />
                    <span>E-mail: </span>
                  </h3>
                  <span title='User e-mail'>{userData.email}</span>
                </div>
                <div className='user-info'>
                  <h3>
                    <HiStar />
                    <span>Active since: </span>
                  </h3>
                  <span title='Active since'>
                    {useDate(userData.createdAt, 'LL')}
                  </span>
                </div>

                <section className='profile-actions'>
                  <button
                    className='edit-btn'
                    onClick={() =>
                      dispatch({
                        type: actions.EDIT_ACCOUNT_MODAL,
                        payload: { ...state, isEditAccountModalActive: true },
                      })
                    }>
                    <FaUserEdit />
                    <span>Edit profile</span>
                  </button>
                  <button
                    className='erase-btn'
                    onClick={() =>
                      dispatch({
                        type: actions.PROMPT_BOX_CONTROL,
                        payload: { ...state, isPromptActive: true },
                      })
                    }>
                    <BiTrash />
                    <span>Delete Account</span>
                  </button>
                </section>
              </div>
            </section>
          </section>

          <section className='app-container'>
            <h2 className='title'>
              <BsApp />
              <span>Application</span>
            </h2>
            <section className='section-container'>
              <div className='appearence'>
                <h3 className='sub-title'>
                  <HiColorSwatch />
                  <span>Themes and Color Schemes</span>
                </h3>
                <div className='content'>
                  <button
                    onClick={() =>
                      dispatch({
                        type: actions.THEME_SWITCHER_MODAL,
                        payload: { ...state, isThemeModalActive: true },
                      })
                    }>
                    <HiViewBoards />
                    <span>Change theme</span>
                  </button>
                </div>
              </div>
            </section>
          </section>

          <section className='about-container'>
            <h2 className='title'>
              <SiAboutdotme />
              <span>About</span>
            </h2>
            <section className='about-section'>
              <section className='logo'>
                <FaBug />
                <span>Bug Tracker</span>
              </section>
              <section className='app-info'>
                <div className='user-info'>
                  <h3>
                    <FaBug />
                    <span>
                      {app_metadata.appName} - v{app_metadata.version}
                    </span>
                  </h3>
                </div>
                <div className='user-info'>
                  <h3>
                    <HiCode />
                    <span title='Kain Nhantumbo'>
                      Developer: Kain Nhantumbo
                    </span>
                  </h3>
                </div>
                <div className='user-info'>
                  <h3>
                    <FaGithub />
                    <span title='github.com/KainNhantumbo'>
                      Github:
                      <a
                        href='https://github.com/KainNhantumbo'
                        rel='noreferrer'
                        target={'_blank'}>
                        {' '}
                        github.com/KainNhantumbo
                      </a>
                    </span>
                  </h3>
                </div>
                <div className='user-info'>
                  <h3>
                    <FaCopyright />
                    <span title={app_metadata.copyright}>
                      {app_metadata.copyright}
                    </span>
                  </h3>
                </div>
                <div className='user-info'>
                  <h3>
                    <GiMite />
                    <span title={app_metadata.license}>
                      {app_metadata.license}
                    </span>
                  </h3>
                </div>
              </section>
            </section>
          </section>
        </article>
      </Container>
    </>
  );
};

export default Adjustments;
