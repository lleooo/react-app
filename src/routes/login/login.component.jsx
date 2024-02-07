import {useDispatch} from "react-redux";
import {loginAsync, logoutAsync} from "../../store/jwt-token/token.action";
import styled, {keyframes} from "styled-components";
import bg from '../../assets/back1.jpg';


const inputHighlighterAnimation = keyframes`
  from {
    background: #5264AE;
  }
  to {
    width: 200px;
    background: transparent;
  }
`;

const LoginPage = styled.div`
    font-family: 'Montserrat', sans-serif;
    width:100%;
    height:100vh;
    position: absolute;
    top: 0;
    
    background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.34226190476190477) 0%), url(${bg});
    background-size: cover;
`;

const LoginContainer = styled.div`
    width:320px;
    height:460px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
`;

const LoginText = styled.p`
    color: #f5f5f5;
    font-size: 2.2rem;
    text-align:center
`;

const InputGroup = styled.div`
    position:relative;
    top:3%
`;

const Group = styled.div`
    position:relative;
    left:8%
`;


const Input = styled.input`
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    margin-top:25px;
    display: block;
    width: 250px;
    border: none;
    border-bottom: 1px solid #1a1a1a;
    background: transparent;
    &:focus {
        outline: none;
    }

    &:focus ~ span.highlight {
        animation: ${inputHighlighterAnimation} .3s ease;
    }

    &:focus ~ label {
        top:-20px;
        font-size:14px;
        color: #ffffff;
    }

    &:focus ~ span.bar{
        width:265px;
    }
`;

const Bar = styled.span`
    position: relative;
    display: block;
    width: 0px;
    height:2px;
    background: #ffffff;
    transition: 0.2s ease all;
`;

const Label = styled.label`
    color:#1a1a1a;
    font-size:18px;
    font-weight:normal;
    pointer-events:none;
    position:absolute;
    top:10px;
    left:5px;
    transition: 0.2s ease all;
`;


const Highlight = styled.span`
    position: absolute;
    height: 60%;
    width: 10px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
`;

const LoginButton = styled.button`
    position:relative;
    left:8%;
    width:265px;
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

const SignUpText = styled.span`
    width:265px;
    position:relative;
    left:8%;
    display:block;
    margin-top:1.5rem;
    text-align:end;
`;

const Login = () => {
    const dispatch = useDispatch();

    const loginClickHandler = () => {
        dispatch(loginAsync());
    };

    const logoutClickHandler = () => {
        dispatch(logoutAsync());
    };

    return (
        <LoginPage>
            <LoginContainer>
                <LoginText>Sign in</LoginText>
                <InputGroup>
                    <Group>
                        <Input required="" type="text"></Input>
                        <Highlight className="highlight"></Highlight>
                        <Bar className="bar"></Bar>
                        <Label>Name</Label>
                    </Group>
                    <Group>
                        <Input required="" type="text"></Input>
                        <Highlight className="highlight"></Highlight>
                        <Bar className="bar"></Bar>
                        <Label>Password</Label>
                    </Group>
                    <LoginButton>LOGIN</LoginButton>
                    <SignUpText>New here?</SignUpText>
                </InputGroup>
            </LoginContainer>
        </LoginPage>
    );
};

export default Login;