// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Axios from 'axios'
import Header from '../components/header.component';
import { Link } from "react-router-dom";

import '../stylesheets/artistPage.css';

class ArtistPage extends React.Component {
    constructor() {
        super();
        this.state = {
            artistInfo: {},
        };
    }

    componentDidMount() {
        // console.log(this.state.searchResults)
        this.getArtistInfo();
    }

    render() {

        return (
            <div className="welcome-container">
                <header className="header-container">
                    <Header/>
                </header>
                {this._renderArtistInfo()}
            </div>
        );
    }

    _renderArtistInfo() {
        let artistProfilePic;
        if (this.state.artistInfo.images) {
            artistProfilePic = this.state.artistInfo.images[0].url 
        }
        
        return (
            <div className="artist-info-container">
                <img
                    className="responsive-img"
                    src={artistProfilePic}
                    alt={this.state.artistInfo.name} />
                <h1>{this.state.artistInfo.name}</h1>
                <h2>94%</h2>
            </div>
        )
    }

    getArtistInfo() {
        let Spotify = require('node-spotify-api');
        let spotify = new Spotify({
            id: "954f448ac26243a4956269df9f39d46a",
            secret: "51a8a82747a04c9ba6b073c632556969"
        });

        let artistId = window.location.pathname.substring(12);
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
)(ArtistPage))