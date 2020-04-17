import Axios from 'axios'

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

export function register(username, password, about) {
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post('/api/user/', {username, password, about})
            .then(response => {
                console.dir(response.data);
                dispatch(registerSuccess(response.data.username))
                },
                error => dispatch(registerFailure(error.response.data.message))
            );
    }
}