import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #2F2E41FF;
  }
  ul, li {
    list-style-type: none;
  }
  
  .darkmode{
    background-color: #282c34;
    color: #F5F5F5;
  }
  
  .lightmode{
    background-color: #F5F5F5;
    color: #282c34;
  }


`

export default GlobalStyles