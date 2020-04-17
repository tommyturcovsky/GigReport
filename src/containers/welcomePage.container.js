// remove all references to username
import React from "react";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Header from '../components/header.component';

import '../stylesheets/welcomePage.css';

class WelcomePage extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="welcome-container">
                <header className="header-container">
                    <Header/>
                </header>
                <main className="welcome-body">
                    <section className="welcome-about">
                        <div className="welcome-about-details">
                            <div className="welcome-about-details-inner">
                            <h1>Welcome to GigReport</h1>
                            <p>Did you go to a concert that rocked, meh, down-right stunk?
                            Let the world know! Don't know if you should spend the cash
                            to go to the show? Check out some reviews by others!
                            </p>
                            <button className="find-reviews-button">Find Concert Reviews</button>    
                            </div>
                        </div>
                    </section>
                    <section className="welcome-details">
                        <div className="welcome-details-box">
                            <h3>Track Your Concerts</h3>
                            <p>Attend a concert? Make a review, then see your 
                            concerts saved to your profile. It is that easy.
                            </p>
                        </div>
                        <div className="welcome-details-box">
                            <h3>Rock out smarter</h3>
                            <p>Read other user reviews artists' live shows
                             before buying a ticket.
                            </p>
                        </div>
                    </section>
                </main>
                <footer className="foot">
                        <br></br>
                </footer>
            </div>
        );
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
)(WelcomePage))