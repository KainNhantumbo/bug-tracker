import { useState, useEffect } from 'react';
import { CreateBugContainer as Container } from '../styles/create-bug';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import {
	BiBug,
	FaPerbyte,
	FaTypo3,
	FaUser,
	HiCheck,
	HiDocumentAdd,
	HiFlag,
	HiLibrary,
	HiOutlineFlag,
	HiSave,
	VscIssueDraft,
} from 'react-icons/all';
import ThemeDialogBox from '../components/ThemeDialogBox';
import { useParams } from 'react-router-dom';
import { InputEvents, SubmitEvent } from '../types/form';
interface DataProps {
	name: string;
	feature: string;
	priority: string;
	description: string;
	author: string;
	status: string;
	associated: string;
}

export default function CreateBug(): JSX.Element {
	const [errorMessage, setErrorMessage] = useState('');
	const [issueData, setIssueData] = useState<DataProps>({
		name: '',
		feature: '',
		priority: '',
		description: '',
		author: '',
		status: '',
		associated: '',
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

	const handleSubmit = async (e: SubmitEvent): Promise<void> => {};

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
				<div className='wrapper'>
					<form onSubmit={handleSubmit}>
						<section className='aside'>
							<div className='form-element'>
								<label>
									<BiBug />
									<span>Status</span>
								</label>
								<select
									name='status'
									defaultValue={issueData.status}
									onChange={handleChange}
								>
									<option value='progress'>In progress</option>
									<option value='unknown'>Unknown</option>
									<option value='pending'>Pending</option>
									<option value='completed'>Completed</option>
									<option value='solved'>Solved</option>
								</select>
							</div>

							<div className='form-element'>
								<label>
									<FaPerbyte />
									<span>Priority</span>
								</label>
								<select
									name='priority'
									defaultValue={issueData.priority}
									onChange={handleChange}
								>
									<option value='low'>Low</option>
									<option value='medium'>Medium</option>
									<option value='high'>High</option>
									<option value='critical'>Critical</option>
								</select>
							</div>
						</section>
						<section className='main-body'>
							<div className='form-element'>
								<label>
									<BiBug />
									<span>Issue name</span>
								</label>
								<input
									type='text'
									placeholder='Type issue name here.'
									name='name'
									value={issueData.name}
									required
									onChange={handleChange}
								/>
							</div>
							<div className='form-element'>
								<label>
									<HiFlag />
									<span>Feature</span>
								</label>
								<input
									type='text'
									placeholder='Type issue feature that is associated to.'
									name='feature'
									value={issueData.feature}
									required
									onChange={handleChange}
								/>
							</div>

							<div className='form-element'>
								<label>
									<HiDocumentAdd />
									<span>Description</span>
								</label>
								<textarea
									name='description'
									placeholder='Type issue description here.'
									value={issueData.name}
									required
									onChange={handleChange}
									rows={12}
								/>
							</div>

							<div className='form-element'>
								<label>
									<FaUser />
									<span>Reporter</span>
								</label>
								<input
									type='text'
									placeholder='Type bug reporter.'
									name='feature'
									value={issueData.author}
									required
									onChange={handleChange}
								/>
							</div>
							<div className='form-element'>
								<label>
									<HiLibrary />
									<span>Associated to</span>
								</label>
								<input
									type='text'
									placeholder='Type issue bug that is associated to.'
									name='feature'
									value={issueData.associated}
									required
									onChange={handleChange}
								/>
							</div>

							<span className='errorMessage'>{errorMessage}</span>

							<section className='actions'>
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
							</section>
						</section>
					</form>
				</div>
			</Container>
		</>
	);
}
