import React from "react";
import {connect} from 'react-redux';
import {clear, logOut} from '../../actions/user.action'
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

class LogoutContainer extends React.Component {
    onClick(event) {
        event.preventDefault();
        this.props.logout(this.state);
        window.location.replace("/");
    }

    componentDidMount() {
        this.props.clear();
    }

    render() {
        // if (this.props.redirect === "") {
        //     return (<Redirect to={this.props.redirect}/>)
        // }

        let pathToMyProfile = '/profile/' + this.props.currentUser;

        return (
        <div className="header">
            <div>
            <Link className="title-link"to={'/'}>
                <h1 className="logo-title">GigReport</h1>  
            </Link>
            </div>
            <div className="header-buttons">
                <button className="header-button find-header">Find Reviews</button>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <img src="https://via.placeholder.com/33/000000/FFFFFF/?text=ProfilePic" alt="Profile Pic"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >
                            <Link to={{ pathname: pathToMyProfile}}>
                            <button className="header-button">
                                    My Profile
                            </button>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item><button className="header-button" onClick={(e) => this.onClick(e)}>Logout</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
            </div>
        </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        logout: () => dispatch(logOut()),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        // ...state.user,
        currentUser: state.user.redirect.currentUser
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer)