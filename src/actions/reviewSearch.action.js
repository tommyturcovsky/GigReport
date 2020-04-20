import Axios from 'axios'

function getResultsAttempt() {
    return {
        type: "GET_RESULTS_ATTEMPT"
    }
}

function getResultsSuccess(searchResults) {
    return {
        type: "GET_RESULTS_SUCCESS",
        searchResults
    }
}

function getResultsFailure(error) {
    return {
        type: "GET_RESULTS_FAILURE",
        error
    }
}

export function searchRequest(artistQuery) {
    return function (dispatch) {
        dispatch(getResultsAttempt());
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
                console.log(artistResults);
                dispatch(getResultsSuccess(artistResults))
                // this.setState({
                //     searchResults: artistResults
                // });

            })
            .catch(function (err) {
                dispatch(getResultsFailure())
            });
    }
}