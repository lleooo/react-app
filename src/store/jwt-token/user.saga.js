import {call, put, takeLatest} from 'redux-saga/effects';
import {tokenAction} from "./token.type";
import {getCookie} from "../../utils/cookie/cookie.util";
import {toastAsync} from '../toast/toast.action';

export function* watchRefreshToken() {
    yield takeLatest('REFRESH_ACCESS_TOKEN', refreshTokenSaga);
}

export function* refreshTokenSaga(action) {
    try {
        const res = yield call(fetch, '/api/refresh', {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
            },
        });

        if (res.status === 200) {
            const newAccess = getCookie('csrf_access_token'), newRefresh = getCookie('csrf_refresh_token');
            yield put({type: tokenAction.REFRESH_TOKEN_SUCCESS, payload: {'access_token': newAccess, 'refresh_token': newRefresh}});
            yield put(action.payload.reTryMsg);
        } else {
            yield put();
        }
    } catch (error) {

    }
    // if (respone.status === 200) {
    //     dispatch(loginSuccess(currentUser));
    // } else if (respone.status === 401) {
    //     dispatch(loginFail());
    // }
    return 'fail';
}

export function* watchAddFavoriteMovie() {
    yield takeLatest('ADD_FAVORITE_MOVIE', addFavoriteMovieSaga);
}

export function* addFavoriteMovieSaga(action) {
    try {
        const {payload} = action;
        const res = yield call(fetch, '/api/addFavorite', {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'movieID': payload
            })
        });

        const addFavoriteRes = yield res.json();

        switch (addFavoriteRes.msg) {
            case "successful":
                yield put({type: tokenAction.MODIFY_FAVORITE_SUCCESS, payload: {'favorite': addFavoriteRes.data}});
                yield put(toastAsync({'result': 'success', 'msg': addFavoriteRes.msg}));
                break;
            case "access expired":
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
        const res = yield call(fetch, '/api/removeFavorite', {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'movieID': payload
            })
        });
        const rmFavoriteRes = yield res.json();

        switch (rmFavoriteRes.msg) {
            case "success":
                yield put({type: tokenAction.MODIFY_FAVORITE_SUCCESS, payload: {'favorite': rmFavoriteRes.data}});
                yield put(toastAsync({'result': 'success', 'msg': rmFavoriteRes.msg}));
                break;
            case "access expired":
                yield put({type: 'REFRESH_ACCESS_TOKEN', payload: {reTryMsg: {type: "REMOVE_FAVORITE_MOVIE", payload: payload}}});
                break;
            default:
                break;
        }
    } catch (error) {
        yield put({type: 'REMOVE_FAVORITE_MOVIE_FAILED', error: error.message});
    }
}

