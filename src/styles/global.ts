import { createGlobalStyle } from 'styled-components';

const GlobalStylesheet = createGlobalStyle`
  * {    
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    max-width: 100%;
    scroll-padding-top: 70px;
    scroll-behavior: smooth;
  }
  
  span, label {
    user-select: none;
  }
  
  body {
    font-family: 'inter', 'Open Sans', Montserrat, Poppins, 'PT Sans', sans-serif;
    color: rgb(${({ theme }) => theme.font});
    width: 100%;
    background: rgb(${({ theme }) => theme.background});
    position: relative;
    
  }

  input, textarea, select {
    background: rgba(${({ theme }) => theme.primary}, .2);
    color: rgb(${({ theme }) => theme.font});
  }

  html {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    scroll-behavior: smooth;
    width: 5px;
    background: none;
    background: rgba(${({ theme }) => theme.background}, .3);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: rgba(${({ theme }) => theme.primary}, .5);
  }
`;

export default GlobalStylesheet;
