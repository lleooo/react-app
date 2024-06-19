import {combineReducers} from 'redux';
import {moviesReducer} from './movies/movies.reducer';
import {userReducer} from './user/user.reducer';
import {backgroundReducer} from './background-img/background.reducer';
import {toastReducer} from './toast/toast.reducer';

export const rootReducer = combineReducers({
    movies: moviesReducer,
    user: userReducer,
    background: backgroundReducer,
    toast: toastReducer
});