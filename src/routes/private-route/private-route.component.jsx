import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateRouteComponent = (props) => {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyToken = async () => {
            const checkToken = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            const {msg} = await checkToken.json();

            //todo:update currentUser when token auth fail
            switch (msg) {
                case "Token is valid":
                    break;
                case "Token has expired":
                    dispatch({type: 'REFRESH_ACCESS_TOKEN'});
                    break;
                default:
                    break;
            }
        };

        verifyToken();
    }, []);



    return (
        currentUser.login ? <props.Component {...props} /> : <Navigate to="/" />
    );
};

export default PrivateRouteComponent;