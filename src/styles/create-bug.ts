import styled from 'styled-components';
import { BaseButton, BaseButton_Danger } from './generics/buttons';
import { StyledInputs, StyledLabels } from './generics/form';

export const CreateBugContainer = styled.main`
	position: relative;
	width: 100vw;
	top: 95px;
	display: grid;
	justify-content: center;
	align-items: center;

	.wrapper {
		width: 800px;
		margin-bottom: 20px;
		background: rgb(${({ theme }) => theme.foreground});
		border-radius: 0 0 10px 10px;
		padding: 20px;
	}

	.form-container {
		width: 100%;
		max-width: 800px;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;

		@media screen and (max-width: 340px) {
			padding: 40px 15px;
		}

		form {
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			gap: 20px;

			label {
				${StyledLabels}
			}

			${StyledInputs}

			.form-section {
				display: flex;
				flex-direction: row;
				width: 100%;
				gap: 10px;

				@media screen and (max-width: 655px) {
					flex-direction: column;
				}
			}

			.form-element {
				display: flex;
				flex-direction: column;
				width: 100%;
				gap: 5px;
			}

			.errorMessage {
				color: rgb(${({ theme }) => theme.alternative_a});
				font-weight: 500;
				font-size: 0.9rem;
			}

			button {
				${BaseButton_Danger}
			}
		}
	}
`;
