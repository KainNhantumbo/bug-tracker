import styled from 'styled-components';

export const LoadingContainer = styled.section`
	@keyframes animated {
		0% {
			transform: translate(0px);
		}
		50% {
			transform: translate(230px);
		}
		100% {
			transform: translate(0px);
		}
	}

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
    
		.loader {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
			transform: translate(-50%, -50%);
			left: 50%;
			margin-top: 12px;
			height: 5px;
			width: 240px;
			background: rgb(${({ theme }) => theme.foreground});

			::before {
				content: '';
				background: rgb(${({ theme }) => theme.alternative_a});
				width: 80px;
				height: 5px;
				animation: animated 1.8s infinite ease;
				position: absolute;
				border-radius: 10px;
				left: -34px;
			}
		}
	}
`;
