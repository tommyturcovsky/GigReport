// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Axios from 'axios'
import Moment from 'react-moment';
import Header from '../components/header.component';
import { Link } from "react-router-dom";
import {
    loggedIn,
} from "../actions/user.action";

import {
    getArtistGigReports,
    createReportRequest,
    deleteGigReport
} from "../actions/gigReport.action";

import '../stylesheets/artistPage.css';
// Unicode for emoji's
//     &#129304; 🤘
//     &#128077; 👍
//     &#128078; 👎


class ArtistPage extends React.Component {
    constructor() {
        super();
        this.state = {
            artistInfo: {},
            artistId: window.location.pathname.substring(12)
        };
    }

    componentDidMount() {
        this.props.onMount();
        this.getArtistInfo();
    }

    render() {
        const avgRating = this.calculateArtistAvgRating();

        return (
            <div className="">
                <header className="header-container">
                    <Header/>
                </header>
                {this._renderArtistInfo(avgRating)}
                <div className="review-section-container">
                    <div className="review-section-header">
                        <h2 className="review-section-heading-title">GigReports</h2>
                        {this._renderCreateGigReportButton()}
                    </div>
                    <div className="gigReports-container">
                        {this._renderGigReports(
                            this.props.currentUser,
                            this.props.deleteGigReport
                        )}
                    </div>
                </div>
            </div>
        );
    }

    _renderGigReports(currentUser, deleteGigReport) {
        if (!this.props.gigReportsList) {
            return null;
        }

        if (this.props.gigReportsList.length === 0) {
            return ( <h2>No GigReports for this artist yet</h2> );
        }

        const artistGigReports = this.props.gigReportsList.map(function (gigReport) {
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
            
            function renderUserOptions(currentUser, postAuthor, deleteGigReport, gigReportId) {
                if (currentUser === postAuthor) {
                    return (
                        <div className="post-edit-button-group">
                            {/* Make Link to Edit Container */}
                            <h5>Edit</h5>
                            {/* Dispatch the delete function */}
                            <button onClick={deleteGigReport.bind(this, gigReportId)}>
                                <h5>Delete</h5>
                            </button>
                        </div>
                    );
                } else {
                    return null;
                }
            }

            return (
            <div className="gigReport-container" >
                <div className="gigReport-header">
                    <h5>{rating}</h5>
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
                        {renderUserOptions(currentUser,
                            gigReport.postAuthor,
                            deleteGigReport, gigReport._id)}
                    <h6>Posted: <Moment format="MM/DD/YYYY">{gigReport.postCreated}</Moment></h6>
                    <Link to={"/profile/" + gigReport.postAuthor}>  
                        <h6>By {gigReport.postAuthor}</h6>
                    </Link>     
                </div>
            </div>
            );
        });
        return (artistGigReports)
    }

    calculateArtistAvgRating() {
        if (!this.props.gigReportsList) {
            return null;
        }

        if (this.props.gigReportsList.length === 0) {
            return null;
        }

        let totalScore = 0;
        let numOfReviews = this.props.gigReportsList.length
        for (let i = 0; i < numOfReviews; i++) {
            totalScore += this.props.gigReportsList[i].rating
        }
        let avgRating = totalScore / numOfReviews
        return avgRating.toFixed(1);
    }

    _renderCreateGigReportButton() {
        // let pathToCreateGigReport = '/artistPage/' + this.props.currentUser + '/edit';

        if (this.props.currentUser) {

            return (
                <Link to={{
                        pathname: "/gigReport/create/" + this.state.artistId,
                    state: {
                        }
                    }}>
                <button className="create-GigReport-button">
                    Create a GigReport
                </button>
            </Link> 
            )
        } else {
            return null;
        }
    }

    _renderArtistInfo(avgRating) {
        let artistProfilePic;
        if (this.state.artistInfo.images) {
            artistProfilePic = this.state.artistInfo.images[0].url 
        }

        let rating = avgRating;
        if (rating != null) {
            if (rating >= 90) {
                rating = rating +  "% 🤘"
            } else if (rating >= 50) {
                rating = rating + "% 👍"
            } else {
                rating = rating + "% 👎"
            }
        } else {
            rating = "No GigReports Yet"
        }

        return (
            <div className="artist-info-container">
                <div className="artist-info-pic-container">
                <img
                    className=""
                    src={artistProfilePic}
                    alt={this.state.artistInfo.name} />
                </div>
                <h1>{this.state.artistInfo.name}</h1>
                <h2>{rating}</h2>
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
                let artistEntry = {};
                // Get Info from Results to add to app
                artistEntry.name = artist.name;
                artistEntry.genres = artist.genres;
                artistEntry.images = artist.images;
                artistEntry.spotifyUrl = artist.external_urls.spotify;

                this.setState({
                    artistInfo: artistEntry
                });

            })
            .catch(function (err) {
                console.log(err);
            });
    }
}


function mapDispatchToProps(dispatch, props) {
    let artistToSearchForId = window.location.pathname.substring(12);
    return {
        onMount: () => {
            dispatch(loggedIn());
            dispatch(getArtistGigReports(artistToSearchForId));
            dispatch(createReportRequest());
        },

        deleteGigReport: (gigReportId) => {
            dispatch(deleteGigReport(gigReportId))
        }
    }
}


function mapStateToProps(state, props) {
    return {
        gigReportsList: state.gigReport.gigReportsByArtist.gigReportsList,
        currentUser: state.user.loggedInCheck.currentUser,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistPage))