import {tokenAction} from "./token.type";
import {getCookie} from "../../utils/cookie/cookie.util";

const USER_INIT_STATE = {
    'login': getCookie('csrf_access_token') ? true : false,
    'username': '',
    'email': '',
    'access_token': getCookie('csrf_access_token'),
    'refresh_token': getCookie('csrf_refresh_token'),
    'favorite': []
};

export const tokenReducer = (state = USER_INIT_STATE, action) => {
    switch (action.type) {
        case tokenAction.FETCH_TOKEN_SUCCESS:
        case tokenAction.LOGOUTSUCCESS:
        case tokenAction.FETCH_TOKEN_FAILED:
            return action.payload;
        case tokenAction.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                'access_token': action.payload.access_token,
                'refresh_token': action.payload.refresh_token
            };
        case tokenAction.MODIFY_FAVORITE_SUCCESS:
            return {
                ...state,
                'favorite': [...action.payload.favorite]
            };
        case tokenAction.LOGOUTFAILED:
        case tokenAction.FETCH_TOKEN_START:
            return state;

        default:
            return state;
    }
};