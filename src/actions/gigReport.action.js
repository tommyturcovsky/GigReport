import Axios from 'axios'

function getProfileAttempt() {
    return {
        type: "GET_ARTIST_REPORTS_ATTEMPT"
    }
}

function getProfileSuccess(gigReportsList) {
    return {
        type: "GET_ARTIST_REPORTS_SUCCESS",
        gigReportsList
    }
}

function getProfileFailure(error) {
    return {
        type: "GET_ARTIST_REPORTS_FAILURE",
        error
    }
}

function createGigReportSuccess() {
    return {
        type: "CREATE_REPORT_SUCCESS"
    }
}

export function createReportRequest() {
    return {
        type: 'CREATE_REPORT_REQUEST'
    }
}

export function getArtistGigReports(artistId) {
    return function (dispatch) {
        dispatch(getProfileAttempt());
        return Axios.get(`/api/gigReports/artist/${artistId}`)
            .then(response => {
                dispatch(getProfileSuccess(response.data))
                },
                error => dispatch(getProfileFailure(error.response.data.message))
            );
    }
}

export function createGigReport(postAuthor, postBody, rating, concertVenue, concertCity, concertState, concertDate, artist, artistId) {
    let body = {
        postAuthor: postAuthor,
        postBody: postBody,
        rating: rating,
        concertVenue: concertVenue,
        concertCity: concertCity,
        concertState: concertState,
        concertDate: concertDate,
        artist: artist,
        artistId: artistId
    }
    console.log("body: " + JSON.stringify(body))
    return function (dispatch) {
        dispatch(getProfileAttempt());
        return Axios.post(`/api/gigReports`, body)
            .then(response => {
                dispatch(createGigReportSuccess())
                },
                error => dispatch(getProfileFailure(error.response.data.message))
            );
    }
}

export function deleteGigReport(gigReportId) {
    console.log("made it here: " + gigReportId)
    return function (dispatch) {
        dispatch(getProfileAttempt());
        return Axios.delete(`/api/gigReports/${gigReportId}`)
            .then(response => {
                },
                error => dispatch(getProfileFailure(error.response.data.message))
            )
    }
}