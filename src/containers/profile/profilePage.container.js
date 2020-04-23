import React from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import {
    getProfileInfo,
} from '../../actions/profile.action';

import Header from '../../components/header.component';

import "../../stylesheets/profilePage.css";
import {
    loggedIn,
    updateUserFalse
} from "../../actions/user.action";

class ProfilePage extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }

    onClick(event) {
        // event.preventDefault();
        // this.props.logout(this.state);
        // window.location.replace("/");
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        // if (this.props.redirect === "") {
        //     return (<Redirect to={this.props.redirect}/>)
        // }
        return (
        <div className="">
            <header className="header-container">
                <Header/>
            </header>
            <div className="profile-container">
                <div className="profile-info">
                    <div className="profile text-center">
                        <div className="profile-pic-container">
                            <img src="https://via.placeholder.com/125/000000/FFFFFF/?text=ProfilePic"></img> 
                        </div>
                        <h3 className="profile-username">{this.props.profileUsername}</h3>    
                    </div> 
                    <div className="profile-about-container">
                        <div className="profile-about-title-container">
                            <h3 className="text-center">About</h3> 
                        </div>
                        {/* <p>This is stuff about me</p>        */}
                        {this._renderAboutText()}
                    </div>
                    <div className="profile-edit-button-container">      
                        {this._renderEditButton()}    
                    </div>    
                </div>
                <div className="profile-reviews">
                    <div className="profile-reviews-title-container">
                        <h3>My Concert Reviews</h3>    
                    </div>
                        <p>
                    </p>
                </div>
            </div>
        </div>
        );
    }

    _renderAboutText() {
        if (this.props.profileAbout) {
            return (<p className="text-center">{this.props.profileAbout}</p>)
        } else if (!this.props.profileAbout && this.props.currentUser === this.props.profileUsername) {
            return (<p className="text-center">(Edit profile to populate this)</p>) 
        } else {
            return null;
        }
    }

    _renderEditButton() {
        let pathToProfileEdit = '/profile/' + this.props.currentUser + '/edit';

        if (this.props.currentUser === this.props.profileUsername) {
            return (
            <Link to={{ pathname: pathToProfileEdit}}>
                <button className="edit-profile-button">
                    Edit Profile
                </button> 
            </Link>
            )
        } else {
            return null;
        }
    }

    _renderProfileGigReports() {
        
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        // logout: () => dispatch(logOut()),
        // clear: () => dispatch(clear()),
        onMount: () => {
            
            dispatch(loggedIn());
            dispatch(getProfileInfo(window.location.pathname.substring(9)));
            dispatch(updateUserFalse());
        },
    }
};


function mapStateToProps(state, props) {
    return {
        currentUser: state.user.loggedInCheck.currentUser,
        profileUsername: state.profile.profileInfo.username,
        profileAbout: state.profile.profileInfo.about
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage)