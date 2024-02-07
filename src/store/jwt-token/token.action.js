import {tokenAction} from "./token.type";
import {getCookie} from "../../utils/cookie/cookie.util";
import {useNavigate} from "react-router-dom";


export const loginStart = () => {
    return {type: tokenAction.FETCH_TOKEN_START};
};

export const loginSuccess = () => {
    const payload = {
        'login': true,
        'access_token': getCookie('csrf_access_token'),
        'refresh_token': getCookie('csrf_refresh_token')
    };

    return {type: tokenAction.FETCH_TOKEN_SUCCESS, payload: payload};
};

export const loginFail = () => {
    const payload = {
        'login': false,
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.FETCH_TOKEN_FAILED, payload: payload};
};

export const logoutSuccess = () => {
    const payload = {
        'login': false,
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.LOGOUTSUCCESS, payload: payload};
};

export const logoutFail = () => {
    return {type: tokenAction.LOGOUTFAILED};
};

export const loginAsync = () => (dispatch) => {
    dispatch(loginStart());

    try {
        fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                'username': 'lewo',
                "password": 'test'
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch(loginSuccess());
            });
    } catch {
        dispatch(loginFail());
    }
};

export const logoutAsync = () => async (dispatch) => {
    const respone = await fetch('/api/logout', {method: "POST"});
    if (respone.status === 200) {
        dispatch(logoutSuccess());
    } else {
        dispatch(logoutFail());
    }
};

export const refreshTokenAsync = () => async (dispatch) => {
    const respone = await fetch('/api/refresh', {
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
        },
    });

    if (respone.status === 200) {
        dispatch(loginSuccess());
        return {'res': 'success', 'token': getCookie('csrf_access_token')};
    } else if (respone.status === 401) {
        dispatch(loginFail());
    }
    return 'fail';
};