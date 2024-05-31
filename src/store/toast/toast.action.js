import {toastAction} from "./toast.type";

export const showToast = (toastInfo) => {
    return {type: toastAction.SHOW_TOAST, payload: toastInfo};
};

export const hideToast = (toastInfo) => {
    return {type: toastAction.HIDE_TOAST, payload: toastInfo};
};

export const toastAsync = (toastInfo) => (dispatch) => {
    dispatch(showToast(toastInfo));
    setTimeout(() => {
        dispatch(hideToast(toastInfo));
    }, 2000);
};
