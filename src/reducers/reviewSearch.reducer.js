import {combineReducers} from 'redux'

function searchResults(
    state = {
    },
    action
) {
    switch (action.type) {
        case 'GET_RESULTS_SUCCESS':
            return Object.assign({}, state, {
                results: action.searchResults
            });
        default:
            return state
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'GET_PROFILE_FAILURE':
            return action.error;
        case 'GET_PROFILE_ATTEMPT':
            return '';
        default:
            return state;
    }
}

export default combineReducers({
    searchResults,
    error
});