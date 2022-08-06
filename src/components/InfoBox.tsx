import { InfoBoxContainer as Container } from '../styles/components/info-box';

interface Props {
	active: boolean;
	message: string;
	icon: JSX.Element;
	buttonText?: string;
	actionFn?: () => Promise<void> | void;
}

export default function InfoBox(props: Props): JSX.Element {
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
