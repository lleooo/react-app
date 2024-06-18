import {useForm} from "react-hook-form";
import {ErrorText} from "../../routes/auth/auth.style";
import {Spinner, Button, Card, Label, TextInput} from "flowbite-react";
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginSuccess} from "../../store/jwt-token/token.action";

const AuthForm = ({fields, onSubmitEvent, buttonText, showGoogle = false}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Card className="max-w-sm w-10/12">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitEvent)}>
                {fields.map((field, index) => {
                    const {label, type, name, registers, errorText} = field;
                    return (
                        <div key={index}>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value={label} />
                            </div>
                            <TextInput type={type} {...register(name, registers)} />
                            {errors[name] && <ErrorText>{errorText[errors[name].type]}</ErrorText>}
                        </div>
                    );
                })}
                <Button type="submit">{buttonText === "loading" ? <Spinner /> : <span>{buttonText}</span>}</Button>

                {showGoogle && (
                    <div className="flex w-full items-center flex-col mt-8">
                        <div className=" w-full  text-center mb-4"><span > or login with</span></div>
                        <GoogleLogin
                            type="icon"
                            size="large"
                            shape="pill"
                            onSuccess={async (credentialResponse) => {
                                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/googleSignIn`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        'credential': credentialResponse.credential,
                                    }),
                                    headers: new Headers({
                                        "Content-Type": "application/json",
                                    }),
                                });

                                const googleUserInfo = await res.json();

                                dispatch(loginSuccess(googleUserInfo['data']));
                                // navigate('/movies/popular');
                            }}
                            onError={() => {
                                // console.log('Login Failed');
                            }}
                        />
                    </div>
                )}

            </form>
        </Card>

    );
};

export default AuthForm;
