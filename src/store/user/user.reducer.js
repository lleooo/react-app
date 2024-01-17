import {userAction} from "./user.type";

const USER_INIT_STATE = [];

export const userReducer = (state = USER_INIT_STATE, action) => {

    switch (action.type) {
        case userAction.ADD_USER:
            return [...state, action.payload];
        case userAction.CLEAR_USER:
            return [];
        default:
            return state;
    }

};