import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate} from '../../actions/user.action'
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username: '', password: '', 
        validatePassword: '', about: '',
        adminCode: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.validate(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({
            username: '',
            password: '',
            validatePassword: '',
            about: '',
            adminCode: ''
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            let isAdmin = false;
            if (this.state.adminCode === "admin") {
                isAdmin = true;
            }

            this.props.register(
                this.state.username,
                this.state.password,
                this.state.about,
                isAdmin
            );
        }
    }

    render() {
        if (this.props.redirect.path) {
            return (<Redirect to={this.props.redirect.path}/>)
        }

        let error;
        if (this.props.error || this.props.valid.message) {
            error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        }

        return (
        <div className="">
            <div className="header">
                <Link className="title-link" to={'/'}>
                    <h1 className="logo-title">GigReport</h1>  
                </Link>
                <div className="header-buttons">
                <Link to={'/gigReviewSearch'}>
                    <button className="header-button find-header">Find GigReports</button>
                </Link>
                </div>
            </div>
            <div className="container mt-4">
            <Card>
                <div className="login-card">   
                <Card.Body>
                    <Card.Title>
                        <div className="login-card-title-container">
                            <h2>Sign Up</h2>
                            <Link className="switch-login-card my-auto" to={'/login'}>
                                Login
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
                                onChange={(e) => this.handleChange(e, 'password')} /> </label>
                    <label> Validate Password:
                    <input type="password"
                        disabled={this.props.inFlight}
                        value={this.state.validatePassword}
                        onChange={(e) => this.handleChange(e, 'validatePassword')} /> </label>
                    <label> Tell Us About Yourself:
                    <textarea
                        className="about-textarea"
                        maxLength="150"                    
                        disabled={this.props.inFlight}
                        value={this.state.about}
                        onChange={(e) => this.handleChange(e, 'about')}/> </label>
                    <label className="">
                        Admin Code:
                        <input type="password"
                            disabled={this.props.inFlight}
                            value={this.state.adminCode}
                            onChange={(e) => this.handleChange(e, 'adminCode')}/> </label>
                        
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
        register: (username, password, about) => dispatch(register(username, password, about)),
        clear: () => dispatch(clear()),
        validate: (user) => dispatch(validate(user)),
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)