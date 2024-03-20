import {monsterAction} from "./monster.type";


export const fetchMonsterStart = () => {
    return {type: monsterAction.FETCH_MONSTER_START};
};

export const fetchMovieSuccess = (monster) => {
    return {type: monsterAction.FETCH_MONSTER_SUCCESS, payload: monster};
};

export const fetchMovieFailed = () => {
    return {type: monsterAction.FETCH_MONSTER_FAILED};
};

export const getMovieAsync = () => (dispatch) => {
    // dispatch(fetchMonsterStart());

    try {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=EN')
            .then((response) => response.json())
            .then((monster) => {
                dispatch(fetchMovieSuccess(monster));
            });
    } catch {
        dispatch(fetchMovieFailed());
    }
};