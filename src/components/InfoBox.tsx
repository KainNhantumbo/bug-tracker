import { InfoBoxContainer as Container } from '../styles/components/info-box';
import { InfoProps } from '../context/InfoBoxContext';

interface Props extends InfoProps {
	setStateFn: React.Dispatch<React.SetStateAction<InfoProps>>;
}

export default function InfoBox(props: Props): JSX.Element {
	return (
		<>
			{props.active && (
				<Container>
					<section className='content'>
						<div className='icon'>{props.icon}</div>
						<div className='message'>
							<span>{props.message}</span>
							{props.err && <h3>{props.err}</h3>}
						</div>
						{props.buttonText && (
							<button
								onClick={() => {
									props.actionFn ? props.actionFn() : undefined;
									props.setStateFn((prevState: any) => ({
										...prevState,
										active: false,
									}));
								}}
							>
								<span>{props.buttonText}</span>
							</button>
						)}
					</section>
				</Container>
			)}
		</>
	);
}
