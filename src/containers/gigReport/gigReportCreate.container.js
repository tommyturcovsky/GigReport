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

import { createGigReport } from "../../actions/gigReport.action";

import {
    getProfileInfo,
} from '../../actions/profile.action';

class GigReportCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: "",
            rating: 0,
            concertVenue: "",
            concertCity: "",
            concertState: "",
            concertDate: "",
            artistName: "",
            artistId: window.location.pathname.substring(18),
            artistImages: []
        };
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.createGigReport(
            this.props.currentUser,
            this.state.postBody,
            this.state.rating,
            this.state.concertVenue,
            this.state.concertCity,
            this.state.concertState,
            this.state.concertDate,
            this.state.artistName,
            this.state.artistId
        );
        event.preventDefault();
    }

    componentDidMount() {
        this.getArtistInfo();
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
        const pathToArtistPage = "/artistPage/" + this.state.artistId

        if (this.props.isReportCreated) {
            return <Redirect to={pathToArtistPage}/>
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
            <div className="container my-4">
            <Card>
                <div className="login-card">   
                <Card.Body>
                    <Card.Title>
                        <div className="login-card-title-container">
                            <h2>Create Gig Report</h2>
                        </div>
                    </Card.Title>
                                
                {this._renderArtistInfo()}
                <br></br>         
                <form className="" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="login-form">                   
                        {/* {error} */}
                        <label> Concert Venue
                        <input
                            className="search-input"     
                            disabled={this.props.inFlight}
                            value={this.state.concertVenue}
                            placeholder="Concert Venue..."                    
                            onChange={(e) => this.handleChange(e, 'concertVenue')}/> </label>
                        <label> Concert City
                        <input
                            className="search-input"           
                            disabled={this.props.inFlight}
                            value={this.state.concertCity}
                            placeholder="Concert City..."                    
                            onChange={(e) => this.handleChange(e, 'concertCity')}/> </label>
                        <label> Concert State
                        <input
                            className="search-input"
                            maxLength="2"                    
                            disabled={this.props.inFlight}
                            value={this.state.concertState}
                            placeholder="Concert State..."                    
                            onChange={(e) => this.handleChange(e, 'concertState')} /> </label>
                        <label> Concert Date
                        <input
                            className="search-input"
                            type="date"                    
                            disabled={this.props.inFlight}
                            value={this.state.concertDate}
                            placeholder="Tell us about yourself..."                    
                            onChange={(e) => this.handleChange(e, 'concertDate')} /> </label>
                        <label> Rating
                        <input
                            type="range"
                            className="search-input"
                            min="0"
                            max="100"                    
                            disabled={this.props.inFlight}
                            value={this.state.rating}
                            placeholder="Tell us about the concert..."                    
                            onChange={(e) => this.handleChange(e, 'rating')} /> {this.state.rating}</label>                    
                    </div>
            
                    <label> Tell us about the concert
                    <textarea
                        className="about-textarea concert-details"
                        maxLength="250"                    
                        disabled={this.props.inFlight}
                        value={this.state.postBody}
                        placeholder="Tell us about the concert.."                    
                        onChange={(e) => this.handleChange(e, 'postBody')} /> </label>
                    <div>         
                        <input
                            className="login-card-button float-right"
                            type="submit"
                            value="Submit"
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

    _renderArtistInfo() {
        return (
            <div className="artist-info-container">
                <h3 className="text-center">{this.state.artistName}</h3>
            </div>
        )
    }

    getArtistInfo() {
        let Spotify = require('node-spotify-api');
        let spotify = new Spotify({
            id: "954f448ac26243a4956269df9f39d46a",
            secret: "51a8a82747a04c9ba6b073c632556969"
        });

        let artistId = this.state.artistId;
        let artistGETRequest = 'https://api.spotify.com/v1/artists/' + artistId;
        spotify
            .request(artistGETRequest)
            .then((response) => {
                let artist = response;

                this.setState({
                    artistName: artist.name,
                    artistImages: artist.images
                });

            })
            .catch(function (err) {
                console.log(err);
            });
    }
}


function mapDispatchToProps(dispatch, props) {
    // let userr = (window.location.pathname.substring(9));
    // userr = userr.substring(0, userr.lastIndexOf('/'));

    return {
        // updateUser: (username, about) => dispatch(updateUser(username, about)),
        // clear: () => dispatch(clear()),

        createGigReport: (postAuthor, postBody, rating, concertVenue,
            concertCity, concertState, concertDate, artist, artistId) => {
            dispatch(createGigReport(
                postAuthor, postBody, rating, concertVenue,
                concertCity, concertState, concertDate, artist, artistId
            ))
        },

        onMount: () => {
            dispatch(loggedIn());
            // dispatch(getProfileInfo(userr));
        }
    }
}


function mapStateToProps(state, props) {
    return {
        currentUser: state.user.loggedInCheck.currentUser,
        // profileUsername: state.profile.profileInfo.username,
        // profileAbout: state.profile.profileInfo.about,
        isReportCreated: state.gigReport.gigReportRequest.gigReportCreated
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GigReportCreate)