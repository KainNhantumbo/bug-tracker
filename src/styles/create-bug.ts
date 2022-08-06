import styled from 'styled-components';
import { BaseButton, BaseButton_Danger } from './generics/buttons';
import { StyledInputs, StyledLabels } from './generics/form';

export const CreateBugContainer = styled.main`
	width: 100vw;
	position: relative;
	top: 95px;
	display: grid;
	justify-content: center;

	.wrapper {
		width: 800px;
		margin-bottom: 20px;
		background: rgb(${({ theme }) => theme.foreground});
		border-radius: 0 0 10px 10px;
		padding: 20px;

		@media screen and (max-width: 825px) {
			width: 650px;
		}
		@media screen and (max-width: 685px) {
			width: 100%;
		}
	}

	.form-container {
		width: 100%;
		max-width: 800px;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;

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

				@media screen and (max-width: 570px) {
					flex-direction: column;
					width: 400px;
				}
				@media screen and (max-width: 470px) {
					width: 300px;
				}
				@media screen and (max-width: 365px) {
					width: 100%;
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

			.actions {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				gap: 10px;
				flex-flow: row wrap;
				
				.discard {
					${BaseButton}
				}
				.submit {
					${BaseButton_Danger}
				}
			}
		}
	}
`;
