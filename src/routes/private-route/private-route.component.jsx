import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateRouteComponent = (props) => {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyToken = async () => {
            const checkToken = await fetch('/api/verify-token', {method: "GET"});
            const {msg} = await checkToken.json();

            switch (msg) {
                case "Token is valid":
                    break;
                case "access expired":
                    dispatch({type: 'REFRESH_ACCESS_TOKEN'});
                    break;
                default:
                    break;
            }
        };

        verifyToken();
    }, []);



    return (
        // <Navigate to="/" />
        currentUser.login ? <props.Component {...props} /> : <props.Component {...props} />
    );
};

export default PrivateRouteComponent;