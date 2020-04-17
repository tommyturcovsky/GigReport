import Axios from 'axios'

function getProfileAttempt() {
    return {
        type: "GET_PROFILE_ATTEMPT"
    }
}

function getProfileSuccess(profileInfo) {
    console.log("profile info: " + JSON.stringify(profileInfo))
    return {
        type: "GET_PROFILE_SUCCESS",
        profileInfo
    }
}

function getProfileFailure(error) {
    return {
        type: "GET_PROFILE_FAILURE",
        error
    }
}

export function getProfileInfo(username) {
    return function (dispatch) {
        dispatch(getProfileAttempt());
        return Axios.get(`/api/user/${username}`)
            .then(response => {
                dispatch(getProfileSuccess(response.data))
                },
                error => dispatch(getProfileFailure(error.response.data.message))
            );
    }
}