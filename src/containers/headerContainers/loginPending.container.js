// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import '../../stylesheets/welcomePage.css';

class LoginPending extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="header">
                <div>
                <Link className="title-link"to={'/'}>
                    <h1 className="logo-title">GigReport</h1>  
                </Link>
                </div>
                <div className="header-buttons">
                    <Link to={'/gigReviewSearch'}>
                        <button className="header-button find-header">Find GigReports</button>
                    </Link>
                    <Link to={'/login'}>
                        <button className="header-button">Login</button>
                    </Link>
                    <Link to={'/register'}>
                        <button className="header-button">Sign Up</button>
                    </Link>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        // getPokemon: () => dispatch(fetchPokemon()),
    }
}


function mapStateToProps(state, props) {
    return {
        // ...state.pokemon,
        // username: state.user.username,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPending))