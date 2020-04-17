import {combineReducers} from 'redux'

function profileInfo(
    state = {
    },
    action
) {
    switch (action.type) {
        case 'GET_PROFILE_SUCCESS':
            return Object.assign({}, state, {
                username: action.profileInfo.username,
                about: action.profileInfo.about
            });
        default:
            return state
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'GET_PROFILEFAILURE':
            return action.error;
        case 'GET_PROFILE_ATTEMPT':
            return '';
        default:
            return state;
    }
}

export default combineReducers({
    profileInfo,
    error
});

