import {combineReducers} from 'redux'

function gigReportsByArtist(
    state = {
    },
    action
) {
    switch (action.type) {
        case 'GET_ARTIST_REPORTS_SUCCESS':
            return Object.assign({}, state, {
                gigReportsList: action.gigReportsList,
            });
        default:
            return state
    }
}

function gigReportRequest(
    state = {
        gigReportCreated: false
    },
    action
) {
    switch (action.type) {
        case 'CREATE_REPORT_SUCCESS':
            return Object.assign({}, state, {
                gigReportCreated: true,
            });
        case 'CREATE_REPORT_REQUEST':
            return Object.assign({}, state, {
                gigReportCreated: false,
            });
        default:
            return state
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'GET_ARTIST_REPORTS_FAILURE':
            return action.error;
        case 'GET_ARTIST_REPORTS_ATTEMPT':
            return '';
        default:
            return state;
    }
}

export default combineReducers({
    gigReportsByArtist,
    gigReportRequest,
    error
});