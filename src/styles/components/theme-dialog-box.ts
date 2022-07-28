import styled from 'styled-components';
import { StyledCornerButton } from '../generics/buttons';

export const ThemeDialog = styled.section`
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
		justify-content: space-between;
		flex-direction: column;
		gap: 20px;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
		background: rgb(${({ theme }) => theme.foreground});
		width: 95%;
		min-width: 300px;
		min-height: 200px;
		max-width: 600px;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			place-items: center;
			.quit {
				${StyledCornerButton}
			}

			h2 {
				font-weight: 500;
				font-size: 1rem;
				display: flex;
				align-items: center;
				gap: 5px;
				color: rgb(${({ theme }) => theme.primary});
			}
		}

		@media screen and (max-width: 450px) {
			width: 300px;
		}

		.prompt-info {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 10px;

			div {
				position: relative;
				border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
				background: none;
				border-radius: 8px;
				position: relative;
				padding: 1px 5px;
				font-size: 0.9rem;
				cursor: pointer;

				:hover {
					background: rgb(${({ theme }) => theme.secondary});
					color: rgb(${({ theme }) => theme.neutral});
				}

				svg {
					position: absolute;
					left: 5px;
					top: calc(50% - 8px);
					width: 18px;
					height: 18px;
				}
				span {
					font-weight: 500;
					line-height: 1.8rem;
					padding-left: 25px;
				}
			}
		}
	}
`;
