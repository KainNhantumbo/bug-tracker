import {
	BiTrash,
	BsFlagFill,
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

export default function Adjustments(): JSX.Element {
	return (
		<>
			<Header />
			<ThemeDialogBox />
			<NavigationBar
				previousLocation='/'
				locationName='Adjustments'
				icon={<HiAdjustments />}
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
									<span title='User name'>Mayara Dorreto</span>
								</div>
								<div className='user-info'>
									<h3>
										<FaEnvelope />
										<span>E-mail: </span>
									</h3>
									<span title='User e-mail'>mayaradorreto@mailer.com</span>
								</div>
								<div className='user-info'>
									<h3>
										<BsFlagFill />
										<span>Country: </span>
									</h3>
									<span title='User country'>Austrália</span>
								</div>
								<section className='profile-actions'>
									<button className='edit-btn'>
										<FaUserEdit />
										<span>Edit profile</span>
									</button>
									<button className='erase-btn'>
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
										<span>Bug Tracker V0.0.1 (beta)</span>
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
