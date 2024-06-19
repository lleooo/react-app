import {userAction} from "./user.type";
import {toastAsync} from "../toast/toast.action";

export const loginStart = () => {
    return {type: userAction.FETCH_TOKEN_START};
};

export const loginSuccess = (data) => {
    const payload = {
        'login': true,
        'username': data.username,
        'email': data.email,
        'favorite': data.favorite,
        'access_token': data.access_token,
        'refresh_token': data.refresh_token
    };
    localStorage.setItem('jwt', data.access_token);
    localStorage.setItem('jwt_refresh', data.refresh_token);
    return {type: userAction.FETCH_TOKEN_SUCCESS, payload: payload};
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
    return {type: userAction.FETCH_TOKEN_FAILED, payload: payload};
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
    return {type: userAction.LOGOUTSUCCESS, payload: payload};
};

export const logoutFail = () => {
    return {type: userAction.LOGOUTFAILED};
};

export const signUpSuccess = () => {
    return {type: userAction.SIGNUPSUCCESS};
};

export const signUpFail = () => {
    return {type: userAction.SIGNUPFAILED};
};

export const refreshTokenSuccess = () => {
    const payload = {
        'access_token': localStorage.getItem('jwt'),
        'refresh_token': localStorage.getItem('jwt_refresh')
    };
    return {type: userAction.REFRESH_TOKEN_SUCCESS, payload: payload};
};

export const addFavoriteSuccess = (user) => {
    return {type: userAction.MODIFY_FAVORITE_SUCCESS, payload: user};
};

export const removeFavoriteSuccess = (user) => {
    return {type: userAction.MODIFY_FAVORITE_SUCCESS, payload: user};
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
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwt_refresh');
    dispatch(logoutSuccess());
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