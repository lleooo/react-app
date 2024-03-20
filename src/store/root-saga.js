import {all, takeEvery} from 'redux-saga/effects';

import {addFavoriteMovieSaga} from './jwt-token/user.saga';
import {removeFavoriteMovieSaga} from './jwt-token/user.saga';
import {refreshTokenSaga} from './jwt-token/user.saga';

import {watchRemoveFavoriteMovie} from './jwt-token/user.saga';
import {watchRefreshToken} from './jwt-token/user.saga';
import {watchAddFavoriteMovie} from './jwt-token/user.saga';

export function* rootSaga() {
    yield all([watchRemoveFavoriteMovie(), watchRefreshToken(), watchAddFavoriteMovie()]);
    // yield takeEvery('REMOVE_FAVORITE_MOVIE', removeFavoriteMovieSaga);
    // yield takeEvery('REFRESH_ACCESS_TOKEN', refreshTokenSaga);
    // yield takeEvery('ADD_FAVORITE_MOVIE', addFavoriteMovieSaga);
}