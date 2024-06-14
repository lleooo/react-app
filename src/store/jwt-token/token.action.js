import {tokenAction} from "./token.type";
import {getCookie} from "../../utils/cookie/cookie.util";
import {toastAsync} from "../toast/toast.action";

export const loginStart = () => {
    return {type: tokenAction.FETCH_TOKEN_START};
};

export const loginSuccess = (data) => {
    const payload = {
        'login': true,
        'username': data.username,
        'email': data.email,
        'favorite': data.favorite,
        'access_token': getCookie('csrf_access_token'),
        'refresh_token': getCookie('csrf_refresh_token')
    };
    return {type: tokenAction.FETCH_TOKEN_SUCCESS, payload: payload};
};

export const loginFail = () => {
    const payload = {
        'login': false,
        'username': '',
        'email': '',
        'favorite': [],
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.FETCH_TOKEN_FAILED, payload: payload};
};

export const logoutSuccess = () => {
    const payload = {
        'login': false,
        'username': '',
        'email': '',
        'favorite': [],
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.LOGOUTSUCCESS, payload: payload};
};

export const logoutFail = () => {
    return {type: tokenAction.LOGOUTFAILED};
};

export const signUpSuccess = () => {
    return {type: tokenAction.SIGNUPSUCCESS};
};

export const signUpFail = () => {
    return {type: tokenAction.SIGNUPFAILED};
};

export const refreshTokenSuccess = () => {
    const payload = {
        'access_token': getCookie('csrf_access_token'),
        'refresh_token': getCookie('csrf_refresh_token')
    };
    return {type: tokenAction.REFRESH_TOKEN_SUCCESS, payload: payload};
};

export const addFavoriteSuccess = (user) => {
    return {type: tokenAction.MODIFY_FAVORITE_SUCCESS, payload: user};
};

export const removeFavoriteSuccess = (user) => {
    return {type: tokenAction.MODIFY_FAVORITE_SUCCESS, payload: user};
};

export const loginAsync = (data) => async (dispatch) => {
    const {signInEmail, signInPassword} = data;

    dispatch(loginStart());

    const login = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({
            'email': signInEmail,
            "password": signInPassword
        }),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        credentials: 'include'
    });

    const res = await login.json();

    switch (res['msg']) {
        case "successful":
            dispatch(loginSuccess(res['data']));
            dispatch(toastAsync({'result': 'success', 'msg': 'Login Successful', 'showSubMsg': true, 'subMsg': 'Directing to homepage....'}));
            return true;
        case "Wrong email or password":
            dispatch(loginFail());
            dispatch(toastAsync({'result': 'error', 'msg': res['msg']}));
            return false;
        default:
            return false;
    }
};

export const logoutAsync = () => async (dispatch) => {
    const respone = await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {method: "POST"});
    if (respone.status === 200) {
        dispatch(logoutSuccess());
    } else {
        dispatch(logoutFail());
    }
};

export const signUpAsync = (data) => async (dispatch) => {
    const {signUpName, signUpEmail, signUpPassword} = data;
    const signUpRes = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
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

    const signUpResJson = await signUpRes.json();

    switch (signUpResJson.msg) {
        case "success":
            dispatch(loginAsync({signInEmail: signUpEmail, signInPassword: signUpPassword}));
            dispatch(toastAsync({'result': 'success', 'msg': 'sign up success', 'showSubMsg': true, 'subMsg': 'Directing to homepage....'}));
            return true;
        case "user exist":
            dispatch(signUpFail());
            dispatch(toastAsync({'result': 'error', 'msg': signUpResJson.msg}));
            return false;
        default:
            return false;
    }
};

export const refreshTokenAsync = (currentUser) => async (dispatch) => {
    const respone = await fetch(`${process.env.REACT_APP_API_URL}/api/refresh`, {
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
        },
    });

    if (respone.status === 200) {
        dispatch(loginSuccess(currentUser));
    } else if (respone.status === 401) {
        dispatch(loginFail());
    }
    return 'fail';
};