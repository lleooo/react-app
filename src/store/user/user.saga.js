import {call, put, takeLatest} from 'redux-saga/effects';
import {userAction} from "./user.type";
import {toastAsync} from '../toast/toast.action';

export function* watchRefreshToken() {
    yield takeLatest('REFRESH_ACCESS_TOKEN', refreshTokenSaga);
}

export function* refreshTokenSaga(action) {
    try {
        const jwt_refresh = localStorage.getItem('jwt_refresh');
        const res = yield call(fetch, `${process.env.REACT_APP_API_URL}/api/refresh`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt_refresh}`,
            },
        });

        const refreshTokenRes = yield res.json();

        if (refreshTokenRes.refresh) {
            localStorage.setItem('jwt', refreshTokenRes.access_token);
            const newJwt = localStorage.getItem('jwt');
            yield put({type: userAction.REFRESH_TOKEN_SUCCESS, payload: {'access_token': newJwt, 'refresh_token': jwt_refresh}});
            yield put(action.payload.reTryMsg);
        }
    } catch (error) {

    }
    return 'fail';
}

export function* watchAddFavoriteMovie() {
    yield takeLatest('ADD_FAVORITE_MOVIE', addFavoriteMovieSaga);
}

export function* addFavoriteMovieSaga(action) {
    try {
        const {payload} = action;
        const res = yield call(fetch, `${process.env.REACT_APP_API_URL}/api/addFavorite`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'movieID': payload
            })
        });

        const addFavoriteRes = yield res.json();

        switch (addFavoriteRes.msg) {
            case "successful":
                yield put({type: userAction.MODIFY_FAVORITE_SUCCESS, payload: {'favorite': addFavoriteRes.data}});
                yield put(toastAsync({'result': 'success', 'msg': addFavoriteRes.msg, 'showSubMsg': false, 'subMsg': ''}));
                break;
            case "Token has expired":
                yield put({type: 'REFRESH_ACCESS_TOKEN', payload: {reTryMsg: {type: "ADD_FAVORITE_MOVIE", payload: payload}}});
                break;
            default:
                yield put(toastAsync({'result': 'error', 'msg': addFavoriteRes.msg}));
                break;
        }
    } catch {

    }
}

export function* watchRemoveFavoriteMovie() {
    yield takeLatest('REMOVE_FAVORITE_MOVIE', removeFavoriteMovieSaga);
}

export function* removeFavoriteMovieSaga(action) {
    try {
        const {payload} = action;
        const res = yield call(fetch, `${process.env.REACT_APP_API_URL}/api/removeFavorite`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'movieID': payload
            })
        });
        const rmFavoriteRes = yield res.json();

        switch (rmFavoriteRes.msg) {
            case "success":
                yield put({type: userAction.MODIFY_FAVORITE_SUCCESS, payload: {'favorite': rmFavoriteRes.data}});
                yield put(toastAsync({'result': 'success', 'msg': rmFavoriteRes.msg, 'showSubMsg': false, 'subMsg': ''}));
                break;
            case "Token has expired":
                yield put({type: 'REFRESH_ACCESS_TOKEN', payload: {reTryMsg: {type: "REMOVE_FAVORITE_MOVIE", payload: payload}}});
                break;
            default:
                break;
        }
    } catch (error) {
        yield put({type: 'REMOVE_FAVORITE_MOVIE_FAILED', error: error.message});
    }
}

