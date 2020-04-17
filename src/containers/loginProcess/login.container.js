import React from "react";
import {connect} from 'react-redux';
import {clear, login} from '../../actions/user.action'
import { Redirect} from "react-router";
import { Link } from "react-router-dom";

import { Card } from 'react-bootstrap';

import '../../stylesheets/header.css';
import '../../stylesheets/login.css';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({username: '', password: ''});
    }

    render() {
        if (this.props.redirect.path) {
            return (<Redirect to={this.props.redirect.path}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error}</h3>)
        }

        return (
            <div className="">
                <div className="header">
                    <Link className="title-link" to={'/'}>
                        <h1 className="logo-title">GigReport</h1>  
                    </Link>
                    <div className="header-buttons">
                        <button className="header-button find-header">Find Reviews</button>
                    </div>
                </div>
                <div className="container mt-4">
                <Card>
                    <div className="login-card">   
                    <Card.Body>
                        <Card.Title>
                            <div className="login-card-title-container">
                                <h2>Login</h2>
                                <Link className="switch-login-card my-auto" to={'/register'}>
                                    No account? Sign up!
                                </Link>
                            </div>
                        </Card.Title>
                    <hr></hr>
                    <form className="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                        {error}      
                        <label className="">
                            Username:
                            <input type="text"
                                disabled={this.props.inFlight}
                                value={this.state.username}
                                onChange={(e) => this.handleChange(e, 'username')}/> </label>
                        <label> Password:
                            <input type="password"
                                disabled={this.props.inFlight}
                                value={this.state.password}
                                onChange={(e) => this.handleChange(e, 'password')}/> </label>
                        <input
                            className="login-card-button"
                            type="submit"
                            value="Submit"
                            disabled={this.props.inFlight} />
                    </form>  
                    </Card.Body>
                    </div>        
                </Card>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)