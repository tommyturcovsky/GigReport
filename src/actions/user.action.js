import Axios from 'axios';

function loginAttempt() {
    return {
        type: "LOGIN_ATTEMPT"
    }
}

function loginSuccess(username) {
    return {
        type: "LOGIN_SUCCESS",
        username
    }
}

function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        error
    }
}

function registerAttempt() {
    return {
        type: "REGISTER_ATTEMPT"
    }
}

function registerSuccess(username) {
    return {
        type: "REGISTER_SUCCESS",
        username
    }
}

function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        error
    }
}

function logoutSuccess() {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

function loggedInTrue(currentUser, admin) {
    return {
        type: "LOGGED_IN_TRUE",
        currentUser: currentUser,
        admin: admin
    }
}

function loggedInFalse() {
    return {
        type: "LOGGED_IN_FALSE"
    }
}

function updateUserSubmitted() {
    return {
        type: "EDIT_SUBMITTED"
    }
}

function updateUserNotSubmitted() {
    return {
        type: "EDIT_NOT_SUBMITTED"
    }
}


export function selectUser(username) {
    return {
        type: "SELECT_USER",
        username
    }
}

export function validate(user) {
    return  {...user,
        type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
    return {
        type: "CLEAR"
    }
}

export function loggedIn() {
    return function (dispatch) {
        return Axios.get('/api/user/loggedin')
            .then(response => dispatch(loggedInTrue(response.data.username,
                response.data.admin)),
            error => dispatch(loggedInFalse()))
    }
}

export function login(user) {
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.post('/api/user/authenticate', user)
            .then(response => dispatch(loginSuccess(response.data.username)),
                error => dispatch(loginFailure(error.response.data))
            );
    }
}

export function logOut() {
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.get('/api/user/logout')
            .then(response => {
                    dispatch(logoutSuccess())
                },
                error => console.log(error));
    }
}

export function register(username, password, about, admin) {
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post('/api/user/', {username, password, about, admin})
            .then(response => {
                console.dir(response.data);
                dispatch(registerSuccess(response.data.username))
                },
                error => dispatch(registerFailure(error.response.data.message))
            );
    }
}

export function updateUser(usernameToUpdate, about) {
    let putRequestPath = '/api/user/' + usernameToUpdate;
    let body = {about: about}
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.put(putRequestPath, body)
            .then(response => {
                dispatch(updateUserSubmitted())
                },
                error => dispatch(registerFailure(error.response.data.message))
            );
    }
}

export function updateUserFalse() {
    return function (dispatch) {
        return dispatch(updateUserNotSubmitted());
    }
}