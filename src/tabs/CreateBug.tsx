import { useState, useEffect } from 'react';
import { CreateBugContainer as Container } from '../styles/create-bug';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import {
	HiAnnotation,
	HiBan,
	HiChartBar,
	HiCheck,
	HiFlag,
	HiHashtag,
	HiPencil,
	HiPuzzle,
	HiSave,
	HiStatusOnline,
	HiUser,
	VscIssueDraft,
} from 'react-icons/all';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { InputEvents, SubmitEvent } from '../types/form';
import feedBack from '../utils/feedback';
import useConnectAPI from '../hooks/fetch';
import Loading from '../components/Loading';

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
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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
				await useConnectAPI({
					method: 'patch',
					url: `/bugs/${id}`,
					data: issueData,
				});
				navigate('/');
				return;
			}
			await useConnectAPI({ method: 'post', url: '/bugs', data: issueData });
			navigate('/');
		} catch (err: any) {
			console.log(err.response.data?.message);
			feedBack(setErrorMessage, err.response.data?.message, 5000);
		}
	};

	// gets bug data to fill the fields
	const getBugData = async (): Promise<void> => {
		if (!isUpdate) return;
		setIsLoading(true);
		try {
			const { data } = await useConnectAPI({
				method: 'get',
				url: `/bugs/${id}`,
			});
			setIssueData(data.bug);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.error(err);
		}
	};

	useEffect(() => {
		getBugData();
	}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
			<Loading active={isLoading} />
			<NavigationBar
				locationName={isUpdate ? 'Update Bug' : 'Create Bug'}
				icon={<VscIssueDraft />}
			/>
			<Container>
				<section className='wrapper'>
					<div className='form-container'>
						<form onSubmit={handleSubmit}>
							<div className='form-element'>
								<label>
									<HiHashtag />
									<span>Bug title</span>
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
										<HiStatusOnline />
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
										<HiUser />
										<span>Reporter</span>
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
									<span>Description</span>
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
									<HiBan />
									<span>Discard</span>
								</button>
								<button className='submit' type='submit'>
									{isUpdate ? (
										<>
											<HiCheck />
											<span>Update</span>
										</>
									) : (
										<>
											<HiSave />
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
