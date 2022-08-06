import { LoadingContainer as Container } from '../styles/components/loading';

interface Props {
	active: boolean;
}

export default function Loading(props: Props): JSX.Element {
	return (
		<>
			{props.active && (
				<Container>
					<section className='content'>
						<div className='title'>Now Loading</div>
						<div className='sub-title'>Please wait...</div>
						<i className='loader'></i>
					</section>
				</Container>
			)}
		</>
	);
}
