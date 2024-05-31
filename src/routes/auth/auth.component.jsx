import {useDispatch, useSelector} from "react-redux";
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

import {HiCheck, HiX} from "react-icons/hi";
import {Toast} from "flowbite-react";

const Auth = () => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const toast = useSelector(state => state.toast);

    const toggleHandler = () => {
        setToggle(!toggle);
    };

    return (
        <LoginPage>
            {toast.show && <Toast className="fixed top-10 right-5">
                {toast.result === "success" ?
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div> :
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                }
                <div className="ml-3 text-sm font-normal">{toast.msg}</div>
            </Toast>}

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