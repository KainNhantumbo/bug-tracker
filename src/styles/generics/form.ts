import { css } from 'styled-components';

export const StyledLabels = css`
	font-weight: 500;
	display: inline;
	position: relative;
	line-height: 1.4rem;

	svg {
		width: 16px;
		height: 16px;
		position: absolute;
		top: 2px;
		left: 0;
		color: rgb(${({ theme }) => theme.alternative_a});
	}
	span {
		padding-left: 25px;
		font-weight: 500;
	}
`;

export const StyledInputs = css`
	input,
	textarea,
	select {
		width: 100%;
		height: fit-content;
		border: none;
		padding: 10px;
		line-height: 1.2rem;
		font-weight: 400;
		outline: none;
		border-radius: 5px;
		background: rgba(${({ theme }) => theme.primary}, 0.2);
		border: 1px solid transparent;

		:focus {
			border: 1px solid rgba(${({ theme }) => theme.accent}, 0.3);
		}
		::placeholder {
			color: rgba(${({ theme }) => theme.font}, 0.8);
			font-size: 0.9rem;
		}
		:disabled {
			background: none;
			border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
			::placeholder {
				color: transparent;
			}
		}
	}
	textarea {
		resize: none;
	}
`;
