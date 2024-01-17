import {monsterAction} from "./monster.type";


export const fetchMonsterStart = () => {
    return {type: monsterAction.FETCH_MONSTER_START};
};

export const fetchMonsterSuccess = (monster) => {
    return {type: monsterAction.FETCH_MONSTER_SUCCESS, payload: monster};
};

export const fetchMonsterFailed = () => {
    return {type: monsterAction.FETCH_MONSTER_FAILED};
};

export const getMonsterAsync = () => (dispatch) => {
    dispatch(fetchMonsterStart());

    try {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=zh-TW')
            .then((response) => response.json())
            .then((monster) => {
                dispatch(fetchMonsterSuccess(monster));
            });
    } catch {
        dispatch(fetchMonsterFailed());
    }
};