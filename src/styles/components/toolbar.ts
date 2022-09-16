import styled from 'styled-components';
import { BaseButton, Button_Mono_B } from '../generics/buttons';

export const ToolbarContainer = styled.section`
	position: fixed;
	left: 0;
	top: 60px;
	padding: 5px 10px;
	width: 100%;
	height: 35px;
	background: rgb(${({ theme }) => theme.foreground});
	border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	z-index: 5000;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	gap: 5px;

	.left-container,
	.right-container {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		gap: 20px;

		@media screen and (max-width: 320px) {
			gap: 12px;
			font-size: 0.9rem;
		}
	}

	@media screen and (max-width: 380px) {
		.right-container {
			display: none;
		}
	}

	.mono {
		${Button_Mono_B}
		padding: 0;
		border: none;

		svg {
			width: 28px;
			height: 28px;
		}
	}

	.descripted {
		${BaseButton}
		padding: 3px;
		border: none;
		border-radius: 0px;

		span {
			padding: 0;
			padding-left: 20px;
		}

		svg {
			width: 18px;
			height: 18px;
			left: 0;
			top: calc(50% - 9px);

			@media screen and (max-width: 320px) {
				top: calc(50% - 9px);
			}
		}
	}
`;
