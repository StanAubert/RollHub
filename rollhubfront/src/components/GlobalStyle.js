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
  :root {
    --color-green: #04AA6D;
  }

  #custom-scroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  #custom-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  #custom-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: var(--color-green);
  }

`

export default GlobalStyles