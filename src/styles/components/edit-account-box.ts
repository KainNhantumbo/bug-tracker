import styled from 'styled-components';
import { BaseButton, BaseButton_Danger } from '../generics/buttons';
import { StyledInputs, StyledLabels } from '../generics/form';

export const EditAccountContainer = styled.section`
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

		@media screen and (max-width: 430px) {
			gap: 5px;
		}

		.prompt-info {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 10px;
			.prompt-title {
				font-weight: 500;
				color: rgb(${({ theme }) => theme.primary});
			}
			.prompt-message {
				line-height: 1.6rem;
				font-size: 0.9rem;
			}

			.content-container {
				display: flex;
				gap: 10px;
				flex-direction: column;

				form {
					display: flex;
					flex-direction: column;
					gap: 15px;

					.form-section {
						display: flex;
						flex-direction: row;
						width: 100%;
						gap: 10px;

						@media screen and (max-width: 430px) {
							flex-direction: column;
							gap: 5px;
						}
						.form-element {
							display: flex;
							flex-direction: column;
							width: 100%;
							gap: 5px;
						}
					}

					label {
						${StyledLabels}
					}

					.alert {
						font-size: 0.9rem;
						padding: 0;
					}

					${StyledInputs}
					.errorMessage {
						color: rgb(${({ theme }) => theme.alternative_a});
						font-weight: 500;
						font-size: 0.9rem;
					}
				}
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
