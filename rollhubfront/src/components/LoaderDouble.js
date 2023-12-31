import React from 'react';
import styled from "styled-components";
import {Blur} from "./modal/BasicModal";

const LoaderDouble = () => {
    return (
        <Blur>
            <Loader>
                <p className="double">
                            <span className="ouro">
                                <span className="left">
                                    <span className="anim"></span>
                                </span>
                                <span className="right">
                                    <span className="anim"></span>
                                </span>
                            </span>
                </p>
                <h2>Chargement ...</h2>
            </Loader>
        </Blur>
    );
};

const Loader = styled.div`
  align-self: center;
  justify-content: center;
  margin: auto;
  transform: scale(2);
  .ouro {
    position: relative;
    display:inline-block;
    height: 46px;
    width: 46px;
    margin: 1em;
    border-radius: 50%;
    background: none repeat scroll 0 0 #DDDDDD;
    overflow:hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.1) inset, 0 0 25px rgba(0,0,255,0.075);
  }

  .ouro:after {
    content: "";
    position: absolute;
    top: 9px; left: 9px;
    display: block;
    height: 28px; width: 28px;
    background: none repeat scroll 0 0 #F2F2F2;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }
  .ouro > span {
    position: absolute;
    height: 100%; width: 50%;
    overflow: hidden;
  }
  .left  { left:0   }
  .right { left:50% }

  .anim {
    position: absolute;
    left: 100%; top: 0;
    height: 100%; width: 100%;
    border-radius: 999px;
    background: none repeat scroll 0 0 #508EC3;
    opacity: 0.8;
    -webkit-animation: ui-spinner-rotate-left 3s infinite;
    animation: ui-spinner-rotate-left 3s infinite;
    -webkit-transform-origin: 0 50% 0;
    transform-origin: 0 50% 0;
  }
  .left .anim {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .right .anim {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    left: -100%;
    -webkit-transform-origin: 100% 50% 0;
    transform-origin: 100% 50% 0;
  }
  
  /* round variation */
  .round .ouro:after {display:none }

  /* double variation */
  .double .ouro:after {
    height: 13px; width: 13px;
    left: 7px; top: 7px;
    border: 10px solid #ddd;
    background: transparent;
    box-shadow: none;
  }

  @keyframes ui-spinner-rotate-right{
    0%{transform:rotate(0deg)}
    25%{transform:rotate(180deg)}
    50%{transform:rotate(180deg)}
    75%{transform:rotate(360deg)}
    100%{transform:rotate(360deg)}
  }
  @keyframes ui-spinner-rotate-left{
    0%{transform:rotate(0deg)}
    25%{transform:rotate(0deg)}
    50%{transform:rotate(180deg)}
    75%{transform:rotate(180deg)}
    100%{transform:rotate(360deg)}
  }

  @-webkit-keyframes ui-spinner-rotate-right{
    0%{-webkit-transform:rotate(0deg)}
    25%{-webkit-transform:rotate(180deg)}
    50%{-webkit-transform:rotate(180deg)}
    75%{-webkit-transform:rotate(360deg)}
    100%{-webkit-transform:rotate(360deg)}
  }
  @-webkit-keyframes ui-spinner-rotate-left{
    0%{-webkit-transform:rotate(0deg)}
    25%{-webkit-transform:rotate(0deg)}
    50%{-webkit-transform:rotate(180deg)}
    75%{-webkit-transform:rotate(180deg)}
    100%{-webkit-transform:rotate(360deg)}
  }

`
export default LoaderDouble;