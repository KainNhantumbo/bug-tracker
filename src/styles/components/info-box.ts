import styled from 'styled-components';

export const InfoBoxContainer = styled.section`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: rgb(${({ theme }) => theme.background});
	z-index: 10000;
  top: 95px;
	left: 0;
	display: grid;
	place-content: center;
	user-select: none;
	position: fixed;

	.content {
    margin-top: -95px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;

		.title {
			font-size: 1.2rem;
			font-weight: 600;
		}

		.sub-title {
		}

	}
`;
