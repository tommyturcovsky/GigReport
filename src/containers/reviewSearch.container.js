// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Header from '../components/header.component';
import { Link } from "react-router-dom";
import { searchRequest } from "../actions/reviewSearch.action";

import '../stylesheets/reviewSearch.css';

class ReviewSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: []
        };
    }

    componentDidMount() {
        // console.log(this.state.searchResults)
    }

    render() {
        let artistQuery = "";

        return (
            <div className="welcome-container">
                <header className="header-container">
                    <Header />
                </header>
                <div className="search-background">
                    <div className="container search-page-container">
                        <div className="row py-2 pl-2 search-heading-container">
                            <h2>Search for GigReports</h2>
                        </div>
                        <div className="row">
                            <div className="container py-2 search-bar-container">
                                <div className="my-auto">
                                    <label className="pr-2 search-label">Search by Artist</label>
                                    <input
                                        className="search-input"
                                        onChange={(e) => artistQuery = e.target.value}
                                        name="title" component="input" type="text"
                                        placeholder="Enter Artist Name..." />
                                </div>
                                <div className="">
                                    <button
                                        onClick={() => this.searchForArtists(artistQuery)}
                                        className="header-button" type="submit">Search
                                    </button>
                                </div>
                            </div>
                            {this._renderSearchResults()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderSearchResults() {
        // console.log(this.state.searchResults)
        if (this.state.searchResults.length === 0) {
            return null;
        }

        try {
            let artistRows = this.state.searchResults.map(function (artist, index) {
                let artistId = artist.id;
                let pathToArtistPage = "/artistPage/" + artistId;

                let artistProfilePic;
                if (artist.images) {
                    artistProfilePic = artist.images[0].url
                }
                return (
                    <Link className="results-row-link" to={pathToArtistPage}>
                        <div className="search-results-row" key={index}>
                            <img
                                className="responsive-img"
                                src={artistProfilePic}
                                alt={artist.name} />
                            <div className="results-artist-name-container">
                                <h4 className="results-artist-name">{artist.name}</h4>
                            </div>
                        </div>
                    </Link>
                );
            });

            return (
                artistRows
            );
        } catch (err) {
            return <h3>Unable to make Request. Redefine Search
                (shorter versions of the search usually work well)
                </h3>
        }
    }

    searchForArtists(artistQuery) {
        let Spotify = require('node-spotify-api');
        let spotify = new Spotify({
            id: "954f448ac26243a4956269df9f39d46a",
            secret: "51a8a82747a04c9ba6b073c632556969"
        });

        let artistResults = [];
        
        spotify.search({ type: 'artist', query: artistQuery, limit: 5 })
            .then((response) => {
                let spotifyResults = response.artists.items;
                
                let i = 0;
                for (let artist of spotifyResults) {
                    let artistEntry = {};
                    // Get Info from Results to add to app
                    artistEntry.index = i;
                    artistEntry.id = artist.id;
                    artistEntry.name = artist.name;
                    artistEntry.spotifyLink = artist.href;
                    artistEntry.images = artist.images;
                    // Add Entry to list
                    artistResults.push(artistEntry);
                    i++;
                }

                this.setState({
                    searchResults: artistResults
                });

            })
            .catch(function (err) {
                console.log(err);
            });
    };
}


function mapDispatchToProps(dispatch, props) {
    return {
        // getPokemon: () => dispatch(fetchPokemon()),
        // searchRequest: (artist) => dispatch(searchRequest(artist))
    }
}


function mapStateToProps(state, props) {
    return {
        // ...state.pokemon,
        // username: state.user.username,
        // error: state.search.error,
        // searchResults: state.search.searchResults.results
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewSearch))