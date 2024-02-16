import styled from "styled-components";
import bg2 from '../../assets/back2.jpg';

export const LoginPage = styled.div`
    font-family: 'Montserrat', sans-serif;
    position: relative;
    top: 0;
    width:100%;
    height:100vh;
    background: url(${bg2});
    background-size: cover;
`;

export const AuthContainer = styled.div`
    width:65%;
    height:80%;
    background-color: rgba(239,241,255, 0.5);
    position:absolute;
    top:55%;
    left:50%;
    transform:translate(-50%, -50%);

    display:flex;
    align-items:center;
    justify-content: space-around;
`;

export const FormContainer = styled.div`
    transition: all .8s;
    width:35%;

    &.hide{
        transform: translateX(30%);
    }
    &.hide2{
        transform: translateX(-30%);
    }
`;

export const FormTitle = styled.p`
    color: #f5f5f5;
    font-size: 2.2rem;
    text-align:center
`;

export const Group = styled.div`
    position:relative;
    left:15%;
    margin-top:1rem
`;


export const Input = styled.input`
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 250px;
    border: none;
    border-bottom: 1px solid #1a1a1a;
    background: transparent;
    &:focus {
        outline: none;
    }
    &:focus ~ span.bar{
        width:70%;
    }
`;

export const Bar = styled.span`
    position: relative;
    display: block;
    width: 0px;
    height:2px;
    background: #ffffff;
    transition: 0.2s ease all;
`;

export const Label = styled.label`
    color:#1a1a1a;
    font-size:18px;
    font-weight:normal;
    pointer-events:none;
    top:10px;
    left:5px;
    transition: 0.2s ease all;
`;


export const Highlight = styled.span`
    position: absolute;
    height: 60%;
    width: 10px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
`;

export const AuthBtn = styled.button`
    position:relative;
    left:15%;
    width:70%;
    margin-top:10%;
    border:none;
    background:#e8e8e8;
    font-size:16px;
    padding:7px;
    border-radius: 0.5em;
    border: 1px solid #e8e8e8;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -1px 12px #ffffff;

    &: active{
        box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
    }
`;

export const SignUpText = styled.span`
    width:70%;
    position:relative;
    left:8%;
    display:block;
    margin-top:1.5rem;
    text-align:end;
`;

export const Toggle = styled.div`
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #5c6bc0, #512da8);
    color: #fff;
    position: relative;
    left: -100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
`;

export const ToggleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;

    &.active{
        transform: translateX(-100%);
        border-radius: 0 150px 100px 0;

        .toggle-left {
            transform: translateX(-5%);
        }

        .toggle-right{
            right: 0;
            transform: translateX(200%);
        }
        ${Toggle} {
            transform: translateX(50%);
        }
    }
`;



export const TogglePanel = styled.div`
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;

    &.toggle-left{
        transform: translateX(-200%);
    }

    &.toggle-right{
        right: 0;
        transform: translateX(8%);
    }
`;

export const ToggleBtn = styled.button`
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid #ffffff ;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
`;

export const ErrorText = styled.p`
    color: #bf1650;
    &::before{
        display: inline;
        content: "⚠ ";
    }
`;