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

function gigReportsByUser(
    state = {
    },
    action
) {
    switch (action.type) {
        case 'GET_USER_REPORTS_SUCCESS':
            return Object.assign({}, state, {
                gigReportsListUser: action.gigReportsListUser,
            });
        default:
            return state
    }
}

function gigReportIndividual(
    state = {
    },
    action
) {
    switch (action.type) {
        case 'GET_REPORT_SUCCESS':
            return Object.assign({}, state, {
                postBody: action.gigReport.postBody,
                rating: action.gigReport.rating,
                concertVenue: action.gigReport.concertVenue,
                concertCity: action.gigReport.concertCity,
                concertState: action.gigReport.concertState,
                concertDate: action.gigReport.concertDate,
                artistId: action.gigReport.artistId
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
    gigReportsByUser,
    gigReportsByArtist,
    gigReportRequest,
    gigReportIndividual,
    error
});