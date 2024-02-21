import AuthForm from '../auth-form/auth-form.component';
import {
    FormContainer,
    FormTitle
} from "../../routes/auth/auth.style";

const SignUpComponent = (props) => {
    const errorText = {
        "required": 'This field is required',
        "pattern": "Entered value does not match email format",
        "minLength": "Password should be at least 8 characters"
    };
    const signUpHandler = (data) => {
        const {signUpName, signUpEmail, signUpPassword} = data;
        fetch('/api/signup', {
            method: "POST",
            body: JSON.stringify({
                'username': signUpName,
                'email': signUpEmail,
                "password": signUpPassword
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            })
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
                buttonText="Sign Up"
            />
        </FormContainer>
    );
};

export default SignUpComponent;
