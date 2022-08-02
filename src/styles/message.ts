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
`;
