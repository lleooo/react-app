import {moviesAction} from "./movies.type";

const MOVIES_INIT_STATE = [];

export const moviesReducer = (state = MOVIES_INIT_STATE, action) => {

    switch (action.type) {
        case moviesAction.FETCH_MOVIES_SUCCESS:
            return [...action.payload.results];
        case moviesAction.FETCH_MOVIES_FAILED:
            return [...state];
        default:
            return state;
    }
};