// Define your room reducer
const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ROOMS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_ROOMS_SUCCESS':
            return {
                ...state,
                loading: false,
                rooms: action.payload,
            };
        case 'GET_ROOMS_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default roomReducer;
