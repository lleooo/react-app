import {useForm} from "react-hook-form";
import {
    Group,
    Input,
    Bar,
    Label,
    Highlight,
    AuthBtn,
    ErrorText
} from "../../routes/auth/auth.style";
import {Spinner} from "flowbite-react";

const AuthForm = ({fields, onSubmitEvent, buttonText}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmitEvent)}>
            {fields.map((field, index) => {
                const {label, type, name, registers, errorText} = field;
                return (
                    <Group key={index}>
                        <Label>{label}</Label>
                        <Input type={type}  {...register(name, registers)}></Input>
                        <Highlight className="highlight"></Highlight>
                        <Bar className="bar"></Bar>
                        {errors[name] && <ErrorText>{errorText[errors[name].type]}</ErrorText>}
                    </Group>
                );
            })}
            <AuthBtn type="submit">
                {buttonText === "loading" ? <Spinner /> : <span>{buttonText}</span>}
            </AuthBtn>
        </form>
    );
};

export default AuthForm;
