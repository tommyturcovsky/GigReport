import React from "react";
import {connect} from 'react-redux';
import {
    clear,
    loggedIn,
} from '../../actions/user.action'
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

import { 
    updateGigReport,
    getGigReport
 } from "../../actions/gigReport.action";

class GigReportEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGigReportId: window.location.pathname.substring(16),
            artistId: this.props.artistId
            // postBody: this.props.postBodyEdit,
            // rating: this.props.ratingEdit,
            // concertVenue: props.concertVenueEdit,
            // concertCity: this.props.concertCityEdit,
            // concertState: this.props.concertStateEdit,
            // concertDate: this.props.concertDateEdit,
        };
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.updateGigReport(
            this.state.currentGigReportId,
            this.state.postBody,
            this.state.rating,
            this.state.concertVenue,
            this.state.concertCity,
            this.state.concertState,
            this.state.concertDate,
        );
        event.preventDefault();
        // let pathBack = "/artistPage/" + this.props.artistId;
        // location.assign(pathBack);
        this.props.history.goBack();
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
        // let error;
        // if (this.props.error || this.props.valid.message) {
        //     error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        // }
        
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
            <div className="container my-4">
            <Card>
                <div className="login-card">   
                <Card.Body>
                    <Card.Title>
                        <div className="login-card-title-container">
                            <h2>Edit Gig Report</h2>
                        </div>
                    </Card.Title>
                                
                <hr></hr>         
                <form className="" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="login-form">    
                        {/* {error} */}
                        <label> Concert Venue
                        <input
                            className="search-input"     
                            disabled={this.props.inFlight}
                            value={this.state.concertVenue}
                            placeholder={this.props.concertVenueEdit}                    
                            onChange={(e) => this.handleChange(e, 'concertVenue')}/> </label>
                        <label> Concert City
                        <input
                            className="search-input"           
                            disabled={this.props.inFlight}
                            value={this.state.concertCity}
                            placeholder={this.props.concertCityEdit}                     
                            onChange={(e) => this.handleChange(e, 'concertCity')}/> </label>
                        <label> Concert State
                        <input
                            className="search-input"
                            maxLength="2"                    
                            disabled={this.props.inFlight}
                            value={this.state.concertState}
                            placeholder={this.props.concertStateEdit}                     
                            onChange={(e) => this.handleChange(e, 'concertState')} /> </label>
                        {/* <label> Concert Date
                        <input
                            className="search-input"
                            type="date"                    
                            disabled={this.props.inFlight}
                            value={this.state.concertDate}
                            placeholder="Tell us about yourself..."                    
                            onChange={(e) => this.handleChange(e, 'concertDate')} /> </label> */}
                        <label> Rating
                        <input
                            type="number"
                            className="search-input"
                            min="0"
                            max="100"                    
                            disabled={this.props.inFlight}
                            value={this.state.rating}
                            placeholder={this.props.ratingEdit}                    
                            onChange={(e) => this.handleChange(e, 'rating')} /></label>                    
                    </div>
            
                    <label> Tell us about the concert
                    <textarea
                        className="about-textarea concert-details"
                        maxLength="250"                    
                        disabled={this.props.inFlight}
                        value={this.state.postBody}
                        placeholder={this.props.postBodyEdit}                    
                        onChange={(e) => this.handleChange(e, 'postBody')} /> </label>
                    <div>         
                        <input
                            className="login-card-button float-right"
                            type="submit"
                            value="Submit Changes"
                            disabled={this.props.inFlight} />
                    </div>       
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
    let reportIdToFind = window.location.pathname.substring(16)
    // userr = userr.substring(0, userr.lastIndexOf('/'));

    return {
        // updateUser: (username, about) => dispatch(updateUser(username, about)),
        // clear: () => dispatch(clear()),

        updateGigReport: (gigReportToUpdate, postBody, rating, concertVenue,
            concertCity, concertState, concertDate) => {
            dispatch(updateGigReport(
                gigReportToUpdate, postBody, rating, concertVenue,
                concertCity, concertState, concertDate
            ))
        },

        onMount: () => {
            dispatch(loggedIn());
            dispatch(getGigReport(reportIdToFind));
        }
    }
}


function mapStateToProps(state, props) {
    return {
        currentUser: state.user.loggedInCheck.currentUser,
        // profileUsername: state.profile.profileInfo.username,
        // profileAbout: state.profile.profileInfo.about,
        isReportCreated: state.gigReport.gigReportRequest.gigReportCreated,
        artistId: state.gigReport.gigReportIndividual.artistId,
        postBodyEdit: state.gigReport.gigReportIndividual.postBody,
        ratingEdit: state.gigReport.gigReportIndividual.rating,
        concertVenueEdit: state.gigReport.gigReportIndividual.concertVenue,
        concertCityEdit: state.gigReport.gigReportIndividual.concertCity,
        concertStateEdit: state.gigReport.gigReportIndividual.concertState,
        concertDateEdit: state.gigReport.gigReportIndividual.concertDate
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GigReportEdit)