import React from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import {
    getProfileInfo,
} from '../../actions/profile.action';
import Moment from 'react-moment';

import Header from '../../components/header.component';

import { 
    getUserGigReports,
    deleteGigReport,
 } from "../../actions/gigReport.action";

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
        let isAdmin = false;
        if (this.props.isAdmin) {
            isAdmin = this.props.isAdmin
        }
        
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
                    <div className="profile-about-container mx-auto">
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
                        <h3>My GigReports</h3>
                        {this._renderProfileReports(
                            this.props.currentUser,
                            isAdmin,
                            this.props.deleteGigReport
                        )} 
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

    _renderProfileReports(currentUser, isAdmin, deleteGigReport) {
        if (!this.props.userGigReportsList) {
            return null;
        }

        if (this.props.userGigReportsList.length === 0) {
            return ( <h2>No GigReports created yet</h2> );
        }

        const artistGigReports = this.props.userGigReportsList.map(function (gigReport) {
            // Put Logic here
            //Determine
            let rating = gigReport.rating
            if (rating >= 90) {
                rating = rating +  "% 🤘"
            } else if (rating >= 50) {
                rating = rating + "% 👍"
            } else {
                rating = rating + "% 👎"
            }

            function deletehelper(deleteGigReport, reportId) {
                deleteGigReport(reportId);
                window.location.reload();
            }
            
            function renderUserOptions(currentUser, isAdmin, postAuthor, deletehelper, deleteGigReport, gigReportId) {
                let pathToEditGigReport = "/gigReport/edit/" + gigReportId
                if (currentUser === postAuthor || isAdmin) {
                    return (
                        <div className="post-edit-button-group">
                            <Link to={pathToEditGigReport}>
                                <h5>Edit</h5>
                            </Link>
                            {/* Dispatch the delete function */}
                            <h5 className="gigReport-delete" 
                            onClick={deletehelper.bind(this, deleteGigReport.bind(this), gigReportId)}>
                                <a>Delete</a>
                            </h5>

                        </div>
                    );
                } else {
                    return null;
                }
            }

            return (
            <div className="gigReport-container" >
                <h4 className="text-center mb-4">{gigReport.artist}</h4>
                <div className="gigReport-header">
                    <h5 className="">{rating}</h5>
                    <h5>
                        {"@" + gigReport.concertVenue + " in " +
                                gigReport.concertCity + ", " + gigReport.concertState + " "}
                            <Moment format="MM/DD/YYYY">{gigReport.concertDate}</Moment>
                    </h5>    
                </div>
                <div className="gigReport-body">
                    <p>{gigReport.postBody}</p>
                </div>
                    <div className="gigReport-footer">
                        {renderUserOptions(currentUser, isAdmin,
                            gigReport.postAuthor, deletehelper,
                            deleteGigReport, gigReport._id)}
                    <h6 className="text-center">Posted: <Moment format="MM/DD/YYYY">{gigReport.postCreated}</Moment></h6>
                    <Link to={"/profile/" + gigReport.postAuthor}>  
                        <h6>By {gigReport.postAuthor}</h6>
                    </Link>     
                </div>
            </div>
            );
        });
        return (artistGigReports)
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
            dispatch(getUserGigReports(window.location.pathname.substring(9)));
        },

        deleteGigReport: (gigReportId) => {
            dispatch(deleteGigReport(gigReportId))
        }
    }
};


function mapStateToProps(state, props) {
    return {
        userGigReportsList: state.gigReport.gigReportsByUser.gigReportsListUser,
        currentUser: state.user.loggedInCheck.currentUser,
        isAdmin: state.user.loggedInCheck.admin,
        profileUsername: state.profile.profileInfo.username,
        profileAbout: state.profile.profileInfo.about
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage)