import React from 'react';
import Axios from "axios";
import LogoutContainer from "../containers/headerContainers/logout.container";
import LoginContainer from "../containers/loginProcess/login.container";
import LoginPending from "../containers/headerContainers/loginPending.container"
import { Link } from "react-router-dom";

const LOGGEDIN = 'LOGGEDIN';
const LOGGEDOUT = 'LOGGEDOUT';
const LOADING = 'LOADING';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        // This should really be managed by a Redux store,
        // but am leaving it here for easy visibility
        this.state = {status: LOGGEDIN}
    }

    componentDidMount() {
        Axios.get('/api/user/loggedin')
            .then((response) => this.setState({status: LOGGEDIN}))
            // If a 400 or 500 is returned, Axios will throw the response to the catch
            .catch(() => this.setState({status: LOGGEDOUT}))
    }

    render() {
        switch (this.state.status) {
            case LOADING:
                return null;
            case LOGGEDIN:
                return (<LogoutContainer />);
            case LOGGEDOUT:
                return (<LoginPending />);
        }
    }

}