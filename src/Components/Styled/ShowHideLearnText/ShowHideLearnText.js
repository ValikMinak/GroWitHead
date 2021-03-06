import styled from "styled-components";
import React from "react";

const SectionTextStyles = styled.div`
position:${({show}) => show ? "absolute" : "static"};
top:0;
right:0;
left:0;
bottom:0;
width:100%;
height:${({show}) => show ? "100%" : "45px"};
border-radius:${({show}) => show ? "0px" : "10px"};
z-index:${({show}) => show ? "1" : "0"};

.textItemHeader {
  display:flex;
  justify-content: space-between;
  border-radius: ${({show}) => show ? "0" : "15px"};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  align-items: center;
  position: ${({show}) => show ? "absolute" : "relative"};
  top:0px;
  right:0px;
  height: 45px;
  width:${({show}) => show ? "190px" : "100%"};
  transition: all .3s; 
    &__wrapper{
    position:relative;
    height:45px;
    width:100%;
    right: 0px;
    top: 0px;
    background-color: #ffffff;
    border-radius:${({show}) => show ? "0" : "15px"};;
    }
  &__title {
    margin-left: 10px;
  }
  
  &__nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 2px;
    right: 4px;

    & span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17px;
    height: 17px;
    cursor: pointer;
          & svg {
        transition: all .2  s;
        &:hover {
          transform: scale(1.2);
          transition: all .2    s;
          & path {
            fill: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
}

.textItemContent{
    height: 100%;
    width: 100%;
    & textarea{
        height: 100%;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px;
        border: none;
        background-color: #fff3bf;
        color: ${({textAdded}) => textAdded ? "rgba(0, 0, 0, 0.44)" : "black"};
        resize: none;
        outline: none;
    }
  }
  @media (max-width: 375px) {
  .textItemHeader {
  height: 35px;
  width:${({show}) => show ? "100px" : "100%"};
  }
  }
`;


export const SectionText = ({children, show, textAdded}) => {
    return <SectionTextStyles show={show} textAdded={textAdded}>{children}</SectionTextStyles>
};


