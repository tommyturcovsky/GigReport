import {combineReducers} from 'redux'

function valid(state = {
    success: false,
    message: '',
}, action) {
    switch (action.type) {
        case 'VALIDATE_REGISTER_USER':
            if (!action.password || !action.validatePassword || !action.username) {
                return {...state, message: 'All fields are required.'};
            }
            if (action.password !== action.validatePassword) {
                return {...state, message: 'The passwords must match.'};
            }
            return { success: true, message: '', };
        default:
            return {success: false, message: ''};
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return action.error;
        case 'LOGIN_ATTEMPT':
        case 'REGISTER_ATTEMPT':
            return '';
        default:
            return state;
    }
}

// function username(state = null, action) {
//     switch (action.type) {
//         case 'SELECT_USER':
//             return action.username;
//         case 'CLEAR':
//             return null;
//         default:
//             return state;
//     }
// }

function inFlight(state = false, action) {
    return action.type === 'LOGIN_ATTEMPT';
}

// function redirect(state = '', action) {
//     if (action.type === 'LOGIN_SUCCESS'
//         || action.type === 'REGISTER_SUCCESS'
//         || action.type === 'LOGOUT_SUCCESS' ) {
//         return '/';
//     }
//     return state;
// }

function redirect(
    state = {
        path: '',
    }, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return Object.assign({}, state, {
                path: "/",
                currentUser: action.username
            });
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                path: "/",
                currentUser: null
            });
        default: 
            return Object.assign({}, state, {
                path: "",
            });
    }
}

export default combineReducers({
    error,
    inFlight,
    redirect,
    // username,
    valid
});

