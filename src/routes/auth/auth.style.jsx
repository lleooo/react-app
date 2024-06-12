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
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    display:flex;
    align-items:center;
    justify-content: space-around;
`;

export const FormContainer = styled.div`
    transition: all .8s;
    height: 100%;
    width:45%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormTitle = styled.p`
    color: #f5f5f5;
    font-size: 2.2rem;
    text-align:center;
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
            transform: translateX(0%);
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