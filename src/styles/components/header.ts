import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: space-between;
	padding: 10px;
	background: rgb(${({ theme }) => theme.foreground});

	.mark {
		position: relative;
		svg {
			position: absolute;
			left: 10px;
			top: 2px;
			width: 25px;
			height: 25px;
		}
		h1 {
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 0;
			span {
				padding-left: 42px;
			}
		}
	}
`;
