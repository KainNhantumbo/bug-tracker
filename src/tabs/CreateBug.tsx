import { useState, useEffect } from 'react';
import { CreateBugContainer as Container } from '../styles/create-bug';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import {
	HiAnnotation,
	HiChartBar,
	HiCheck,
	HiDocumentDuplicate,
	HiDotsHorizontal,
	HiFlag,
	HiHashtag,
	HiSave,
	HiStatusOnline,
	HiUser,
	VscIssueDraft,
} from 'react-icons/all';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { useParams } from 'react-router-dom';
import { InputEvents, SubmitEvent } from '../types/form';

interface DataProps {
	title: string;
	feature: string;
	priority: string;
	description: string;
	author: string;
	status: string;
	associated: string;
	comment: string;
}

export default function CreateBug(): JSX.Element {
	const [errorMessage, setErrorMessage] = useState('');
	const [issueData, setIssueData] = useState<DataProps>({
		title: '',
		feature: '',
		priority: 'low',
		description: '',
		author: '',
		status: 'in progress',
		associated: '',
		comment: '',
	});

	// picks data from inputs
	const handleChange = (e: InputEvents): void => {
		setIssueData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const { id } = useParams();
	const isUpdate = Number(id);

	const handleSubmit = async (e: SubmitEvent): Promise<void> => {
		e.preventDefault();
	};

	useEffect(() => {}, []);

	return (
		<>
			<Header />
			<ThemeDialogBox />
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
										defaultValue={issueData.status}
										onChange={handleChange}
										defaultChecked={true}
									>
										<option value='progress'>In progress</option>
										<option value='unknown'>Unknown</option>
										<option value='pending'>Pending</option>
										<option value='review'>In review</option>
										<option value='completed'>Completed</option>
										<option value='solved'>Solved</option>
									</select>
								</div>

								<div className='form-element'>
									<label>
										<HiChartBar />
										<span>Priority</span>
									</label>
									<select
										name='priority'
										defaultValue={issueData.priority}
										onChange={handleChange}
										defaultChecked={true}
									>
										<option value='low'>Low</option>
										<option value='medium'>Medium</option>
										<option value='high'>High</option>
										<option value='critical'>Critical</option>
										<option value='severe'>Severe</option>
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
										onChange={handleChange}
									/>
								</div>
								<div className='form-element'>
									<label>
										<HiDocumentDuplicate />
										<span>Associated to</span>
									</label>
									<input
										type='text'
										placeholder='Type issue bug that is associated to.'
										name='associated'
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
									placeholder='Type issue description and details here.'
									value={issueData.description}
									required
									onChange={handleChange}
									rows={10}
								/>
							</div>

							<div className='form-element'>
								<label>
									<HiDotsHorizontal />
									<span>Comment</span>
								</label>
								<textarea
									name='comment'
									placeholder='Type some comments here.'
									value={issueData.comment}
									required
									onChange={handleChange}
									rows={5}
								/>
							</div>

							<span className='errorMessage'>{errorMessage}</span>

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
						</form>
					</div>
				</section>
			</Container>
		</>
	);
}
