import styled from 'styled-components';
import { BaseButton_Danger } from './generics/buttons';

export const MessageContainer = styled.div`
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

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 700px;
		margin: 0 10px;

		article {
			display: flex;
			flex-direction: column;
			gap: 20px;

			h2 {
				text-align: center;
				font-weight: 500;
				font-size: 1.2rem;
			}

			p,
			h3 {
				line-height: 1.6rem;
				font-size: 1rem;
			}

			h3 {
				i {
					color: rgb(${({ theme }) => theme.alternative_a});
					font-weight: 600;
					background: rgba(${({ theme }) => theme.primary}, 0.2);
					padding: 5px 8px;
					border-radius: 5px;
					@media screen and (max-width: 455px) {
						display: block;
						width: fit-content;
					}
				}
			}

			button {
				${BaseButton_Danger}
			}
		}
	}
`;
