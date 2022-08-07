import styled from 'styled-components';
import { Button_Mono_B } from '../generics/buttons';

export const NavigationBarContainer = styled.section`
	position: fixed;
	left: 0;
	top: 60px;
	padding: 5px 30px;
	width: 100%;
	height: 35px;
	background: rgb(${({ theme }) => theme.foreground});
	border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	z-index: 5000;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	gap: 30px;

	@media screen and (max-width: 390px) {
		padding: 5px 10px;
		gap: 10px;
	}

	button {
		${Button_Mono_B}
		padding: 0;
		border: none;
		svg {
			width: 28px;
			height: 28px;
		}
	}

	h3 {
		line-height: 1rem;
		font-size: 1rem;
		font-weight: 500;
		color: rgb(${({ theme }) => theme.font});
		user-select: none;
		position: relative;

		span {
			padding-left: 28px;
		}

		svg {
			position: absolute;
			width: 22px;
			height: 22px;
			top: -3px;
			left: 0px;
			color: rgb(${({ theme }) => theme.alternative_a});
		}
	}
`;
