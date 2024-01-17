import {userAction} from "./user.type";


export const addUser = () => {
    const random = Math.floor(Math.random() * 5000);
    const newUser = {name: `user_${random}`};
    return {type: userAction.ADD_USER, payload: newUser};
};

export const clearAllUser = () => {
    return {type: userAction.CLEAR_USER};
};