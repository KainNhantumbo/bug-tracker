import styled from 'styled-components';
import { StyledInputs, StyledLabels } from './generics/form';
import { BaseButton, BaseButton_Danger } from './generics/buttons';

export const LoginContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;

	header {
		width: 100%;
		padding: 15px;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		margin: 0;
		h1 {
			position: relative;
			color: rgb(${({ theme }) => theme.primary});
			line-height: 1rem;
			text-transform: capitalize;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 10px;
		}
		h5 {
			text-align: center;
		}
	}

	article {
		width: 100%;
		padding: 0 20px;

		.form-container {
			width: 100%;
			max-width: 500px;
			display: flex;
			gap: 20px;
			justify-content: flex-start;
			flex-direction: column;
			background: rgb(${({ theme }) => theme.foreground});
			border-radius: 10px;
			border: 1px solid rgba(${({ theme }) => theme.accent}, 0.2);
			box-shadow: 0 0 20px rgba(${({ theme }) => theme.accent}, 0.2);
			padding: 40px 20px;

			@media screen and (min-width: 440px) {
				min-width: 400px;
			}

			.message {
				line-height: 1.4rem;
				font-weight: 600;
				font-size: 1.2rem;
				color: rgb(${({ theme }) => theme.alternative_a});
			}

			p {
				font-weight: 500;
			}

			form {
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				gap: 15px;

				label {
					${StyledLabels}
				}

				${StyledInputs}

				.errorMessage {
					color: rgb(${({ theme }) => theme.alternative_a});
					font-weight: 500;
					font-size: 0.8rem;
					max-width: 320px;
					line-height: 1.4rem;
				}

				.actions {
					display: flex;
					flex-flow: row wrap;
					justify-content: flex-start;
					gap: 10px;

					.login {
						${BaseButton}
					}
					.register {
						${BaseButton_Danger}
					}
				}
			}
			.links {
				color: rgb(${({ theme }) => theme.font});
				font-size: 0.9rem;
				font-weight: 500;

				:hover {
					color: rgb(${({ theme }) => theme.alternative_a});
					transition: all 200ms ease;
				}
			}
		}
	}

	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-weight: 500;
		margin: 0 10px;
		margin-bottom: 20px;

		i {
			color: rgb(${({ theme }) => theme.primary});
		}
	}
`;
