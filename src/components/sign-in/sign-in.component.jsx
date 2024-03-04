import {useDispatch} from "react-redux";
import {loginAsync} from "../../store/jwt-token/token.action";
import AuthForm from '../auth-form/auth-form.component';
import {
    FormContainer,
    FormTitle
} from "../../routes/auth/auth.style";
import {useNavigate} from "react-router-dom";



const SignInComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorText = {
        "required": 'This field is required',
        "pattern": "Entered value does not match email format"
    };

    const loginClickHandler = (data) => {
        dispatch(loginAsync(data)).then((loginSuccess) => {
            if (loginSuccess) navigate('/movies/popular');
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
                buttonText="Sign In"
            />
        </FormContainer>
    );
};

export default SignInComponent;
