import styled from 'styled-components';
import { BaseButton, BaseButton_Danger } from '../generics/buttons';

export const PromptContainer = styled.section`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: rgba(${({ theme }) => theme.background}, 0.2);
	backdrop-filter: blur(2px);
	z-index: 10000;
	top: 0;
	left: 0;
	display: grid;
	place-content: center;
	user-select: none;
	position: fixed;

	.dialog-prompt {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		gap: 20px;
		padding: 20px;
		border-radius: 10px;
		background: rgb(${({ theme }) => theme.foreground});
		max-width: 500px;
		margin: 0 10px;
		box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);

		.prompt-info {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 10px;
			span {
				font-weight: 500;
				color: rgb(${({ theme }) => theme.primary});
			}
			p {
				line-height: 1.6rem;
				font-size: 0.9rem;
			}
		}

		.prompt-actions {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			gap: 10px;
			.prompt-cancel {
				${BaseButton}
			}
			.prompt-accept {
				${BaseButton_Danger}
			}
		}
	}
`;
