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
import Toast from "../../components/toast/toast.component";

const Auth = () => {
    const [toggle, setToggle] = useState(false);

    const toggleHandler = () => {
        setToggle(pre => !pre);
    };

    return (
        <LoginPage>
            <Toast topPos={'10'}></Toast>

            <AuthContainer>

                <SignInComponent />
                <SignUpComponent />

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