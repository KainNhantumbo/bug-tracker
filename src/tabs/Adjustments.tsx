import {
	BiTrash,
	BiTrashAlt,
	FaBug,
	FaCopyright,
	FaEnvelope,
	FaGithub,
	FaUser,
	FaUserCircle,
	FaUserEdit,
	GiMite,
	HiAdjustments,
	HiCode,
	SiAboutdotme,
} from 'react-icons/all';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { AdjustmentsContainer as Container } from '../styles/adjustments';
import { useState, useEffect } from 'react';
import PromptDialogBox from '../components/PromptDialogBox';

interface UserData {
	name: string;
	surname: string;
	email: string;
}

export default function Adjustments(): JSX.Element {
	const [isModalActive, setisModalActive] = useState(false);
	const [userData, setUserData] = useState<UserData>({
		name: 'John',
		surname: 'Doe',
		email: 'basberry@mail.co.nz',
	});

	// controls the state of the prompt modal
	const modalController = (): void =>
		setisModalActive((prevState) => !prevState);

	const deleteUser = async (): Promise<void> => {};

	useEffect(() => {}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<NavigationBar locationName='Adjustments' icon={<HiAdjustments />} />
			<PromptDialogBox
				active={isModalActive}
				action={deleteUser}
				quit={modalController}
				icon={<BiTrashAlt />}
				button_text={'Confirm'}
				prompt_message={
					'This action will permanently delete your account and erase all data associated with it. Are you sure?'
				}
				prompt_title={'Delete account'}
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
										{userData.name + ' ' + userData.surname}
									</span>
								</div>
								<div className='user-info'>
									<h3>
										<FaEnvelope />
										<span>E-mail: </span>
									</h3>
									<span title='User e-mail'>{userData.email}</span>
								</div>

								<section className='profile-actions'>
									<button className='edit-btn'>
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
										<span>Bug Tracker V0.0.2 (beta)</span>
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
												target={'_blank'}
											>
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
}
