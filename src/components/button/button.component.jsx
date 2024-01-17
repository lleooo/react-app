const Button = ({clickEvent, buttonText}) => {
    return (
        <button onClick={clickEvent}>{buttonText}</button>
    );
};

export default Button;