import {useDispatch, useSelector} from "react-redux";
import {loginAsync} from "../../store/jwt-token/token.action";

const Login = () => {
    const dispatch = useDispatch();

    const loginClickHandler = () => {
        dispatch(loginAsync());
    };

    const logoutClickHandler = () => {
        fetch('/api/logout', {method: "POST"});
    };

    return (
        <div>
            <button onClick={loginClickHandler}>
                login
            </button>
            <button onClick={logoutClickHandler}>
                logout
            </button>
        </div>
    );
};

export default Login;