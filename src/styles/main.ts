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

			padding: 10px;
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
				z-index: 4000;
				background: rgb(${({ theme }) => theme.foreground});
			}

			.bug,
			.menu {
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
				padding: 8px 10px;
				:hover {
					background: rgba(${({ theme }) => theme.secondary}, 0.2);
				}

				.action-dots {
					width: 20px;
					height: 20px;
					position: absolute;
					top: calc(50% - 10px);
					right: 5px;
					cursor: pointer;
				}
			}
		}
	}
`;
