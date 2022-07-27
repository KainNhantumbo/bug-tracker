import styled from 'styled-components';
import { BaseButton } from './generics/buttons';

export const AdjustmentsContainer = styled.main`
	width: 100%;
	min-height: 100%;
	padding-left: 180px;
	position: relative;
  margin-top: 90px;

	button {
		${BaseButton}
	}

	.content {
		min-height: 100vh;
		width: 100%;
		max-width: 100%;
		padding: 90px 20px 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.title {
			position: relative;
			svg {
				width: 20px;
				height: 20px;
				position: absolute;
				top: -2px;
				left: 0;
				color: rgb(${({ theme }) => theme.primary});
			}
			span {
				padding-left: 25px;
				text-transform: uppercase;
				font-weight: 500;
			}
		}
		h3 {
			display: inline;
			position: relative;
			line-height: 1.4rem;

			svg {
				width: 16px;
				height: 16px;
				position: absolute;
				top: 2px;
				left: 0;
				color: rgb(${({ theme }) => theme.secondary});
			}
			span {
				padding-left: 25px;
				font-weight: 500;
			}
		}

		.user-container {
			border-top: 1px solid rgb(${({ theme }) => theme.accent});
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: flex-start;

			.section-container {
				display: grid;
				grid-template-columns: 1fr 2fr;
				align-items: center;

				.user-avatar {
					margin: 0 auto;
					svg,
					img {
						width: 70px;
						height: 70px;
					}
				}

				.user-details {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					gap: 10px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.account-container {
			border-top: 1px solid rgb(${({ theme }) => theme.accent});
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: flex-start;

			.title > span {
				color: red;
			}

			.user-actions,
			.info {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				gap: 10px;

				h3 {
					background: rgb(${({ theme }) => theme.accent});
					padding: 2px 5px;
					border-radius: 3px;
					border-left: 2px solid red;
					border-right: 2px solid red;
					svg {
						left: 8px;
						top: 5px;
						color: rgb(${({ theme }) => theme.primary});
					}
				}
				.info {
					p {
						line-height: 1.6rem;
					}
				}

				i {
					color: rgb(${({ theme }) => theme.primary});
				}
			}
		}

		.about-container {
			border-top: 1px solid rgb(${({ theme }) => theme.accent});
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: flex-start;

			.about-section {
				display: grid;
				grid-template-columns: 1fr 1fr;
				align-items: center;
				gap: 10px;

				.logo {
					position: relative;
					color: rgb(${({ theme }) => theme.primary});

					svg {
						position: absolute;
						width: 50px;
						height: 50px;
						top: -8px;
						left: 0;
					}
					span {
						font-size: 2rem;
						font-weight: 600;
						padding-left: 60px;
					}
				}
				.app-info {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					gap: 10px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.storage-container {
			border-top: 1px solid rgb(${({ theme }) => theme.accent});
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: flex-start;
			max-width: 700px;
			font-weight: 500;

			.storage-section {
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				gap: 10px;
			}

			.storage-details {
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				white-space: nowrap;
				gap: 5px;
			}
		}
	}
`;
