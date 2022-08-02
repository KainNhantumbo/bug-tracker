import { FaBug } from 'react-icons/fa';
import { MessageContainer as Container } from '../styles/message';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { HiArrowCircleRight } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

interface PageProps {
	message: string;
	title: string;
	code?: string;
	btnText: string;
	url: string;
}

export default function Message(): JSX.Element {
	const { userRecouveryKey } = useAppContext();
	const [data, setData] = useState<PageProps>({
		title: '',
		message: '',
		btnText: '',
		url: '',
	});

	const navigate: NavigateFunction = useNavigate();
	const { msg } = useParams();

	const loadPage = (type: string | undefined): void => {
		if (type == 'account') {
			setData({
				title: 'Congratulations! Account created successfuly.',
				message: `Please keep the following code a in a safe place, it will be used to recover your account in case that you forgot your password.`,
				btnText: 'Proceed to login page',
				code: `449ae972-9c8c-415a-bc51-0fb3d7907b0b`,
				url: '/tab/login',
			});
		}
	};

	useEffect(() => {
		loadPage(msg);
	}, []);
	return (
		<Container>
			<header className='upper-container'>
				<h1>
					<FaBug />
					<span>Bug Tracker</span>
				</h1>
				<h5>Start shooting on bugs before they know what hit them!</h5>
			</header>
			<main>
				<article>
					<h2>{data.title}</h2>
					<p>{data.message}</p>
					{data.code && (
						<h3>
							Recouvery account key: <i>{data.code}</i>
						</h3>
					)}
					<button onClick={() => navigate(data.url)}>
						<HiArrowCircleRight />
						<span>{data.btnText}</span>
					</button>
				</article>
			</main>
		</Container>
	);
}
