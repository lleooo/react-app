import {useDispatch} from "react-redux";
import {loginAsync} from "../../store/jwt-token/token.action";
import AuthForm from '../auth-form/auth-form.component';
import {
    FormContainer,
    FormTitle
} from "../../routes/auth/auth.style";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


const SignInComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorText = {
        "required": 'This field is required',
        "pattern": "Entered value does not match email format"
    };

    const loginClickHandler = (data) => {
        setIsLoading((prevIsLoading) => !prevIsLoading);
        dispatch(loginAsync(data)).then((loginSuccess) => {

            setIsLoading((prevIsLoading) => !prevIsLoading);

            setTimeout(() => {
                navigate('/movies/popular');
            }, 3100);
        });
    };
    return (
        <FormContainer className={props.className}>
            <FormTitle>Sign in</FormTitle>
            <AuthForm
                fields={[
                    {
                        label: 'Email', type: 'text', name: 'signInEmail', registers: {
                            required: "required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            }
                        }, errorText: errorText
                    },
                    {label: 'Password', type: 'password', name: 'signInPassword', registers: {required: true}, errorText: errorText}
                ]}
                onSubmitEvent={loginClickHandler}
                buttonText={isLoading ? "loading" : "Sign In"}
                showGoogle={true}
            />
        </FormContainer>
    );
};

export default SignInComponent;
