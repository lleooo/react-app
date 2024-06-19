import {userAction} from "./user.type";

const USER_INIT_STATE = {
    'login': localStorage.getItem('jwt') ? true : false,
    'username': '',
    'email': '',
    'access_token': localStorage.getItem('jwt'),
    'refresh_token': localStorage.getItem('jwt_refresh'),
    'favorite': []
};

export const userReducer = (state = USER_INIT_STATE, action) => {
    switch (action.type) {
        case userAction.FETCH_TOKEN_SUCCESS:
        case userAction.LOGOUTSUCCESS:
        case userAction.FETCH_TOKEN_FAILED:
            return action.payload;
        case userAction.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                'access_token': action.payload.access_token,
                'refresh_token': action.payload.refresh_token
            };
        case userAction.MODIFY_FAVORITE_SUCCESS:
            return {
                ...state,
                'favorite': [...action.payload.favorite]
            };
        case userAction.LOGOUTFAILED:
        case userAction.FETCH_TOKEN_START:
            return state;

        default:
            return state;
    }
};