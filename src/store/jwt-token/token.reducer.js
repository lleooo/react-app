import {tokenAction} from "./token.type";

const TOKEN_INIT_STATE = '';

export const tokenReducer = (state = TOKEN_INIT_STATE, action) => {
    switch (action.type) {
        case tokenAction.FETCH_TOKEN_START:
            return state;
        case tokenAction.FETCH_TOKEN_SUCCESS:
            return action.payload;
        case tokenAction.FETCH_TOKEN_FAILED:
            return state;
        default:
            return state;
    }
};