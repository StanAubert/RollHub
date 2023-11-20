import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #2F2E41FF;
  }
  ul, li , li > a{
    list-style-type: none;
    text-decoration: none;
  }

  .App {
    transition: all 0.5s ease;
    height: 100%;
  }
  
  .dark{
    background-color: #282c34;
    color: #F5F5F5;
    a, p{
      color: #F5F5F5;
    }
  }
  
  .light{
    background-color: white;
    color: #282c34;
    
    a, p{
      color: #282c34;
    }
  }


`

export default GlobalStyles