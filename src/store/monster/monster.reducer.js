import {monsterAction} from "./monster.type";

const MONSTER_INIT_STATE = [];

export const monsterReducer = (state = MONSTER_INIT_STATE, action) => {

    switch (action.type) {
        case monsterAction.FETCH_MONSTER_START:
            return [...state];
        case monsterAction.FETCH_MONSTER_SUCCESS:
            return [...action.payload.results];
        case monsterAction.FETCH_MONSTER_FAILED:
            return [...state];
        default:
            return state;
    }
};