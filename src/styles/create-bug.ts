import styled from "styled-components";

export const CreateBugContainer = styled.main`
	position: relative;
	width: 100vw;
	top: 95px;
	margin-bottom: 20px;
	display: grid;
	justify-content: center;
	align-items: center;

  .wrapper {
    background: rgb(${({ theme }) => theme.foreground});
    width: 100%;
    max-width: 1200px;
    border-radius: 0 0 10px 10px;

 
  }
  
`