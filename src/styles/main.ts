import styled from 'styled-components';

export const MainContainer = styled.main`
	position: relative;
	width: 100vw;
	top: 95px;
	display: grid;
	justify-content: center;
	align-items: center;

	.body {
		width: 100vw;
		padding-bottom: 20px;

		.bugs-wrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			width: 100%;

			padding: 10px 0;
			max-width: 1000px;

			@media screen and (max-width: 1000px) {
				margin: 0;
				padding: 0;
				max-width: calc(100% - 1px);
			}

			.bug,
			.menu {
				width: 100%;
				display: grid;
				grid-template-columns: 40% 20% repeat(3, 100px);
				background: rgb(${({ theme }) => theme.foreground});
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

				@media screen and (max-width: 1000px) {
					left: 0;
					border-radius: 0 0 10px 10px;
					margin: 0 10px;
					max-width: calc(100% - 20px);
					box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
					white-space: nowrap;

				}

				div {
					@media screen and (max-width: 1000px) {
						display: none;
					}
				}
				section {
					display: block;
					@media screen and (min-width: 1000px) {
						display: none;
					}
				}
			}

			.bugs-container {
				width: 100%;
				@media screen and (max-width: 1000px) {
					padding: 10px;
					display: grid;
					grid-template-columns: 50% 50%;
					align-items: center;
					justify-items: center;
					gap: 10px;
					width: calc(100% - 10px);
					margin-top: 8px;
				}
				@media screen and (max-width: 500px) {
					grid-template-columns: 100%;
					width: 100%;
				}
			}

			.bug {
				position: relative;
				top: 25px;
				line-height: 1.4rem;
				border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
				padding: 8px 10px;
				width: 100%;
				max-width: 100%;
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
					.icon-b {
						display: none;
					}
					@media screen and (max-width: 1000px) {
						top: 5px;
						.icon-a {
							display: none;
						}
						.icon-b {
							display: block;
						}
					}
				}

				@media screen and (max-width: 1000px) {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					margin: 5px;
					border: none;
					border-radius: 10px;
					width: 100%;
					:hover {
						box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
						transition: all 200ms ease;
						background: rgb(${({ theme }) => theme.foreground});
					}

					div {
						width: 100%;
						align-self: flex-start;
					}
					.title {
						max-width: calc(100% - 55px);
						font-weight: 500;
						margin-top: 5px;
					}

					.created {
						width: 100%;
						justify-self: center;
						margin: 0 auto;
						border-radius: 10px;
						padding: 10px;
						text-align: center;
						background: rgba(${({ theme }) => theme.alternative_a}, 0.2);
						font-weight: 500;
					}
				}

				label {
					color: rgb(${({ theme }) => theme.primary});
					font-weight: 600;
					@media screen and (min-width: 1000px) {
						display: none;
					}
				}
			}
		}

		.end-mark {
			display: grid;
			justify-content: center;
			align-items: center;
			padding: 1px;
			background: rgb(${({ theme }) => theme.foreground});
			border-radius: 0 0 10px 10px;
			margin-top: 25px;
			svg {
				width: 20px;
				height: 20px;
			}

			@media screen and (max-width: 1000px) {
				border-radius: 10px;
				margin-left: 10px;
				margin-right: 10px;
			}
		}
	}
`;
