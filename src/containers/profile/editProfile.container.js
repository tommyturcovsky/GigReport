import React from "react";
import {connect} from 'react-redux';
import {
    clear,
    register,
    validate,
    loggedIn,
    updateUser
} from '../../actions/user.action'
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

import {
    getProfileInfo,
} from '../../actions/profile.action';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: this.props.profileUsername, about: this.props.profileAbout};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.updateUser(
            this.state.username,
            this.state.about
        );
        event.preventDefault();
    }

    componentDidMount() {
        this.props.onMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.valid.success) {
        //     this.props.register(
        //         this.state.username,
        //         this.state.password,
        //         this.state.about
        //     );
        // }
    }

    render() {
        let pathToProfile = '/profile/' + this.props.profileUsername;
        // let error;
        // if (this.props.error || this.props.valid.message) {
        //     error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        // }

        if (this.props.currentUser != this.props.profileUsername) {
            return <Redirect to={pathToProfile}/>
        }

        if (this.props.isEditSubmitted) {
            return <Redirect to={pathToProfile}/>
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
                            <h2>Edit Profile</h2>
                            <Link className="switch-login-card my-auto" to={pathToProfile}>
                                Cancel Changes
                            </Link>
                        </div>
                    </Card.Title>
                <hr></hr>
                <div className="profile text-center">
                    <div className="profile-pic-container">
                        <img src="https://via.placeholder.com/125/000000/FFFFFF/?text=ProfilePic"></img> 
                    </div>
                    <h3 className="profile-username">{this.props.profileUsername}</h3>    
                </div>                 
                <form className="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {/* {error} */}
                     <label> About:
                    <textarea
                        className="about-textarea"
                        maxLength="150"                    
                        disabled={this.props.inFlight}
                        value={this.state.about}
                        placeholder="Tell us about yourself..."                    
                        onChange={(e) => this.handleChange(e, 'about')}/> </label>
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
    let userr = (window.location.pathname.substring(9));
    userr = userr.substring(0, userr.lastIndexOf('/'));

    return {
        updateUser: (username, about) => dispatch(updateUser(username, about)),
        clear: () => dispatch(clear()),

        onMount: () => {
            dispatch(loggedIn());
            dispatch(getProfileInfo(userr));
        }
    }
}


function mapStateToProps(state, props) {
    return {
        currentUser: state.user.loggedInCheck.currentUser,
        profileUsername: state.profile.profileInfo.username,
        profileAbout: state.profile.profileInfo.about,
        isEditSubmitted: state.user.isEditSubmitted
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)