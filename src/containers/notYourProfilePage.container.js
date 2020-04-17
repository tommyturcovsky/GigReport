import React from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';

import Header from '../components/header.component';

import "../stylesheets/profilePage.css";

class NotYourProfilePage extends React.Component {

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
        // this.props.clear();
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
                        <h3 className="profile-username">Not Me</h3>    
                    </div> 
                    <div className="profile-about-container">
                        <div className="profile-about-title-container">
                            <h3 className="text-center">About</h3> 
                        </div>
                        <p>This is stuff about me</p>       
                    </div>    
                </div>
                <div className="profile-reviews">
                    <div className="profile-reviews-title-container">
                        <h3>Profile Reviews</h3>    
                    </div>
                        <p>Reviews done by the user will be put here
                             <br></br><br></br><br></br><br></br><br></br><br></br>
                            more words
                            <br></br><br></br><br></br><br></br><br></br><br></br>
                            <br></br><br></br><br></br><br></br><br></br><br></br>
                            even more words

                            <br></br><br></br><br></br><br></br><br></br><br></br>
                            even more words
                    </p>
                </div>
            </div>
        </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        // logout: () => dispatch(logOut()),
        // clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        // ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotYourProfilePage)