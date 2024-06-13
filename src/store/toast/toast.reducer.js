import {toastAction} from "./toast.type";

const TOAST_INIT_STATE = {
    'show': false,
    'result': null,
    'msg': null,
    'showSubMsg': false,
    'subMsg': null
};

export const toastReducer = (state = TOAST_INIT_STATE, action) => {
    switch (action.type) {
        case toastAction.SHOW_TOAST:
            return {
                ...state,
                'show': true,
                'result': action.payload.result,
                'msg': action.payload.msg,
                'showSubMsg': action.payload.showSubMsg,
                'subMsg': action.payload.subMsg
            };
        case toastAction.HIDE_TOAST:
            return {
                ...state,
                'show': false,
                'result': '',
                'msg': ''
            };
        default:
            return state;
    }
};