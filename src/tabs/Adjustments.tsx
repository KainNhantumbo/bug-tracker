import {
	BiErrorCircle,
	BiTrash,
	BiUserCircle,
	BsFlagFill,
	FaBug,
	FaCopyright,
	FaEnvelope,
	FaGithub,
	FaRegUserCircle,
	FaTimes,
	FaTrashAlt,
	FaUser,
	FaUserCircle,
	GiMite,
	HiAdjustments,
	HiCode,
	HiOutlineUserCircle,
	HiTrash,
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
							<span>User profile</span>
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
							</div>
						</section>
					</section>

					<section className='account-container'>
						<h2 className='title'>
							<BiErrorCircle />
							<span>Danger Zone</span>
						</h2>
						<div className='user-actions'>
							<h3>
								<FaTimes />
								<span>Delete Account</span>
							</h3>
							<div className='info'>
								<p>
									<i>Warning: </i> You will not be able to access your account
									data after you confirm this action.
								</p>
								<button onClick={(e) => {}}>
									<BiTrash/>
									<span>Delete account</span>
								</button>
							</div>
						</div>
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
