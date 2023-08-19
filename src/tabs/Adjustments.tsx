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
import { useThemeContext } from '../context/ThemeContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { controlModal } = useThemeContext();
  const [isModalActive, setisModalActive] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    createdAt: '',
  });

  // controls the state of the prompt modal
  const modalController = (): void =>
    setisModalActive((prevState) => !prevState);

  const deleteUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await fetchAPI({ method: 'delete', url: `/users/${userData._id}` });
      navigate('/tab/login');
    } catch (error: any) {
      setInfo({
        message: 'Oops! Looks something went wrong.',
        active: true,
        actionFn: deleteUser,
        icon: <FaCat />,
        buttonText: 'Refresh and try again',
        err: error?.response?.data?.message || error?.code,
      });
      console.error(error?.response?.data?.message ?? error);
    } finally {
      setIsLoading(false);
    }
  };

  // edit account functions
  const [isEditAccountActive, setIsEditAccountActive] =
    useState<boolean>(false);

  const editBoxController = (): void =>
    setIsEditAccountActive((prevState) => !prevState);

  const getUserDetails = async (): Promise<void> => {
    setIsLoading(true);
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
        actionFn: getUserDetails,
        icon: <FaCat />,
        buttonText: 'Refresh and try again',
        err: error?.response?.data?.message ?? error?.code,
          },
        },
      });
      
      console.error(error?.response?.data?.message ?? error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect((): (() => void) => {
    getUserDetails();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    return (): void => {
      setIsLoading(false);
      setisModalActive(false);
      setInfo((prevState) => ({ ...prevState, active: false }));
    };
  }, []);

  return (
    <>
      <Header />
      <ThemeDialogBox />
      <Loading active={isLoading} />
      <NavigationBar locationName='Adjustments' icon={<HiAdjustments />} />
      <EditAccountBox
        active={isEditAccountActive}
        reload={getUserDetails}
        quit={editBoxController}
      />

      <PromptDialogBox
        active={isModalActive}
        action={deleteUser}
        quit={modalController}
        icon={<BiTrashAlt />}
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
                  <button className='edit-btn' onClick={editBoxController}>
                    <FaUserEdit />
                    <span>Edit profile</span>
                  </button>
                  <button className='erase-btn' onClick={modalController}>
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
                  <button onClick={controlModal}>
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
                    <span>Bug Tracker V1.2.1</span>
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
                    <span title='Copyright &copy; 2022 Kain Nhantumbo'>
                      Copyright &copy; 2022 Kain Nhantumbo
                    </span>
                  </h3>
                </div>
                <div className='user-info'>
                  <h3>
                    <GiMite />
                    <span title='Licensed under Apache 2.0 License'>
                      Licensed under Apache 2.0 License
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
