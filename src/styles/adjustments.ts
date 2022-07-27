import styled from 'styled-components';
import { BaseButton, BaseButton_Danger } from './generics/buttons';

export const AdjustmentsContainer = styled.main`
	position: relative;
	width: 100vw;
	margin-top: 100px;
	margin-bottom: 20px;
	display: grid;
	justify-content: center;
	align-items: center;
  
	article {
    width: 100%;
    max-width: 1100px;
		background: rgb(${({ theme }) => theme.foreground});
		border-radius: 0 0 10px 10px;

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
				text-transform: capitalize;
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

				.profile-actions {
					display: flex;
					flex-flow: row wrap;
					gap: 10px;
					justify-content: flex-start;
					margin-top: 20px;

					.edit-btn {
						${BaseButton}
					}
					.erase-btn {
						${BaseButton_Danger}
					}
				}
			}
		}

		.about-container {
			border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
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
	}
`;
