import { InfoBoxContainer as Container } from '../styles/components/info-box';

interface Props {
	active: boolean;
	message: string;
	icon: JSX.Element;
	buttonText?: string;
	actionFn?: () => Promise<void> | void;
	setStateFn: React.Dispatch<React.SetStateAction<any>>;
	err?: string;
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
