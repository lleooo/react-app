import {moviesAction} from "./movies.type";


export const fetchMovieSuccess = (movies) => {
    return {type: moviesAction.FETCH_MOVIES_SUCCESS, payload: movies};
};

export const fetchMovieFailed = () => {
    return {type: moviesAction.FETCH_MOVIES_FAILED};
};

export const getMovieAsync = () => (dispatch) => {
    try {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=EN')
            .then((response) => response.json())
            .then((movies) => {
                dispatch(fetchMovieSuccess(movies));
            });
    } catch {
        dispatch(fetchMovieFailed());
    }
};