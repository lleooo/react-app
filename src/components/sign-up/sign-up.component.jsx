import AuthForm from '../auth-form/auth-form.component';
import {
    FormContainer,
    FormTitle
} from "../../routes/auth/auth.style";
import {useDispatch} from 'react-redux';
import {signUpAsync} from '../../store/jwt-token/token.action';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

const SignUpComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorText = {
        "required": 'This field is required',
        "pattern": "Entered value does not match email format",
        "minLength": "Password should be at least 8 characters"
    };
    const signUpHandler = (data) => {
        setIsLoading((prevIsLoading) => !prevIsLoading);
        dispatch(signUpAsync(data)).then(signUpSuccess => {
            setIsLoading((prevIsLoading) => !prevIsLoading);
            if (signUpSuccess) {
                setTimeout(() => {
                    navigate('/movies/popular');
                }, 2500);
            }
        });
    };

    return (
        <FormContainer className={props.className}>
            <FormTitle>Sign Up</FormTitle>
            <AuthForm
                fields={[
                    {
                        label: 'Name', type: 'text', name: 'signUpName', registers: {required: true}, errorText: errorText
                    },
                    {
                        label: 'Email', type: 'text', name: 'signUpEmail', registers: {
                            required: "required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            }
                        }, errorText: errorText
                    },
                    {label: 'Password', type: 'text', name: 'signUpPassword', registers: {required: true, minLength: 8}, errorText: errorText}
                ]}
                onSubmitEvent={signUpHandler}
                buttonText={isLoading ? "loading" : "Sign Up"}
            />
        </FormContainer>
    );
};

export default SignUpComponent;
