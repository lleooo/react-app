import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateRouteComponent = (props) => {
    const {login} = useSelector(state => state.user);
    return (
        login ? <props.Component {...props} /> : <Navigate to="/" />
    );
};

export default PrivateRouteComponent;