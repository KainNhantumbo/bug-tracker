import styled from 'styled-components';
import { Button_Mono_B } from '../generics/buttons';
import { StyledInputs } from '../generics/form';

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	background: rgb(${({ theme }) => theme.foreground});
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 60px;
	z-index: 10000;

	.mark {
		position: relative;
		svg {
			position: absolute;
			left: 10px;
			top: 1px;
			width: 25px;
			height: 25px;
			color: rgb(${({ theme }) => theme.alternative_b});
		}
		h1 {
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 0;
			color: rgba(${({ theme }) => theme.alternative_a}, 0.9);
			span {
				padding-left: 42px;
			}
		}
	}

	.side-back {
		display: flex;
		flex-direction: row;
		gap: 10px;

		h5 {
			align-self: center;
			font-size: 0.9rem;
			font-weight: 500;
			color: rgb(${({ theme }) => theme.font});
			position: relative;

			@media screen and (max-width: 550px) {
				display: none;
			}

			svg {
				width: 18px;
				height: 18px;
				position: absolute;
				top: -2px;
				left: -20px;
				color: rgb(${({ theme }) => theme.alternative_b});
			}
		}

		.actions {
			display: flex;
			flex-direction: row;
			gap: 5px;

			.user {
				${Button_Mono_B}
			}
		}

		.search {
			form {
				position: relative;
				${StyledInputs}
				input {
					padding-left: 30px;
					width: 220px;
				}
				svg {
					position: absolute;
					width: 20px;
					height: 20px;
					top: calc(50% - 10px);
					left: 8px;
				}
			}
		}
	}
`;
