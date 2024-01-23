import {tokenAction} from "./token.type";

export const loginStart = () => {
    return {type: tokenAction.FETCH_TOKEN_START};
};

export const loginSuccess = () => {
    function getCookie() {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'csrf_access_token') {
                return value;
            }
        }
        return null;
    }

    const token = getCookie();

    return {type: tokenAction.FETCH_TOKEN_SUCCESS, payload: token};
};

export const loginFail = () => {
    return {type: tokenAction.FETCH_TOKEN_FAILED};
};

export const loginAsync = () => (dispatch) => {
    dispatch(loginStart());

    try {
        fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                'username': 'test',
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