const BACKGROUND_INIT_STATE = {
    index: 0
};

export const backgroundReducer = (state = BACKGROUND_INIT_STATE, action) => {
    switch (action.type) {
        case 'setIndex':
            return {...action.payload};
        default:
            return state;
    }
};