import { css } from 'styled-components';

export const BaseButton = css`
	border: none;
	background: none;
	border-radius: 5px;
	position: relative;
	padding: 10px;
	color: rgb(${({ theme }) => theme.font});
	border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	width: fit-content;
	cursor: pointer;
	:hover {
		color: rgb(${({ theme }) => theme.alternative_a});
	}
	svg {
		width: 20px;
		height: 20px;
		position: absolute;
		top: calc(50% - 10px);
		right: 7px;
		pointer-events: none;
	}
	span {
		padding-right: 20px;
		font-weight: 500;
		pointer-events: none;
	}
`;

export const BaseButton_Danger = css`
	border: none;
	background: rgb(${({ theme }) => theme.alternative_a});
	border-radius: 5px;
	position: relative;
	padding: 10px;
	color: rgb(${({ theme }) => theme.neutral});
	width: fit-content;
	cursor: pointer;
	:hover {
		color: rgb(${({ theme }) => theme.neutral});
		background: rgb(${({ theme }) => theme.secondary});
	}
	svg {
		width: 20px;
		height: 20px;
		position: absolute;
		top: calc(50% - 10px);
		right: 7px;
		pointer-events: none;
	}
	span {
		padding-right: 20px;
		font-weight: 500;
		pointer-events: none;
	}
`;

export const Button_Mono_A = css`
	border: none;
  border-radius: 8px;
  background: rgba(${({ theme }) => theme.primary}, .7);
	color: rgb(${({ theme }) => theme.neutral});
	position: relative;
	padding: 7px 10px;
	width: fit-content;
	cursor: pointer;
	display: grid;
	place-content: center;

	:hover {
		background: rgb(${({ theme }) => theme.alternative_a});
	}
	svg {
		pointer-events: none;
    min-width: 20px;
    min-height: 20px;
	}
`;

export const Button_Mono_B = css`
	border: none;
  border-radius: 5px;
  background: none;
	color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
	position: relative;
	padding: 7px 10px;
	width: fit-content;
	cursor: pointer;
	display: grid;
	place-content: center;

  :hover {
		color: rgb(${({ theme }) => theme.alternative_a});
	}

	svg {
		pointer-events: none;
    min-width: 20px;
    min-height: 20px;
	}
`;

export const StyledCornerButton = css`
	border-radius: 50%;
	background: rgba(${({ theme }) => theme.primary}, 0.4);
	color: rgb(${({ theme }) => theme.primary});
	border: none;
	width: fit-content;
	cursor: pointer;
	display: grid;
	place-content: center;
	padding: 5px;

	:hover {
		background: rgb(${({ theme }) => theme.secondary});
		transition: all 200ms ease;
		svg {
			color: rgb(${({ theme }) => theme.neutral});
		}
	}
	svg {
		pointer-events: none;
	}
`;
