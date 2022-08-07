import styled from 'styled-components';

export const MainContainer = styled.main`
	position: relative;
	width: 100vw;
	top: 95px;
	display: grid;
	justify-content: center;
	align-items: center;

	/* @media screen and (max-width: 745px) {
		grid-template-columns: 200px 1fr;
	}
	@media screen and (max-width: 490px) {
		grid-template-columns: 1fr 1fr;
	} */

	.body {
		width: 100vw;
		.bugs-wrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			width: 100%;

			padding: 10px 0;
			max-width: 1000px;

			.menu {
				width: 100%;
				max-width: 1000px;
				color: rgb(${({ theme }) => theme.primary});
				font-size: 0.9rem;
				font-weight: 600;
				text-transform: uppercase;
				position: fixed;
				top: 95px;
				left: calc(50% - 500px);
				z-index: 1000;
				background: rgb(${({ theme }) => theme.foreground});
			}

			.bug,
			.menu {
				width: 100%;
				display: grid;
				grid-template-columns: 40% 20% repeat(3, 100px);
				align-items: center;
				user-select: none;
				gap: 10px;
				padding: 10px;

				.title,
				.reporter {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.bug {
				position: relative;
				top: 25px;
				line-height: 1.4rem;
				border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
				background: rgb(${({ theme }) => theme.foreground});
				padding: 8px 10px;
				:hover {
					background: rgba(${({ theme }) => theme.secondary}, 0.1);
				}

				.action-dots {
					width: 30px;
					height: 30px;
					padding: 5px;
					border-radius: 50%;
					position: absolute;
					display: grid;
					place-items: center;
					place-content: center;
					top: calc(50% - 15px);
					right: 5px;
					cursor: pointer;
					z-index: 200;

					:hover {
						background: rgba(${({ theme }) => theme.font}, 0.2);
					}

					svg {
						width: 25px;
						height: 25px;
						pointer-events: none;
					}
				}
			}
		}
	}
`;
