import {useDispatch} from "react-redux";
import {logoutAsync} from "../../store/jwt-token/token.action";
import {useState} from "react";
import {
    LoginPage,
    AuthContainer,
    ToggleContainer,
    Toggle,
    TogglePanel,
    ToggleBtn,
} from "./auth.style";

import SignInComponent from "../../components/sign-in/sign-in.component";
import SignUpComponent from "../../components/sign-up/sign-up.component";

const Auth = () => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    const logoutClickHandler = () => {
        dispatch(logoutAsync());
    };

    const toggleHandler = () => {
        setToggle(!toggle);
    };

    return (
        <LoginPage>
            <AuthContainer>

                <SignInComponent className={toggle ? 'hide' : ""} />
                <SignUpComponent className={toggle ? "" : "hide2"} />

                <ToggleContainer className={toggle ? 'active' : ""}>
                    <Toggle>
                        <TogglePanel className="toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <ToggleBtn onClick={() => toggleHandler()}>Sign In</ToggleBtn>
                        </TogglePanel>
                        <TogglePanel className="toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <ToggleBtn onClick={() => toggleHandler()}>Sign Up</ToggleBtn>
                        </TogglePanel>
                    </Toggle>
                </ToggleContainer>
            </AuthContainer>
        </LoginPage>
    );
};

export default Auth;;