import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import WelcomePage from "./containers/welcomePage.container";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from "./containers/loginProcess/login.container";
import Pokemons from "./containers/pokemons.container";
import Register from "./containers/loginProcess/register.container";
import ProfilePage from "./containers/profilePage.container";
import LoggedInComponent from './components/loggedin.component';

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
        {/* <Link to={'/login'}>Login</Link>&nbsp;
        <Link to={'/register'}>Register</Link> */}
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/login" component={UserLogin}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile/:username" component={ProfilePage} />
                <Route exact path="/pokemon" component={LoggedInComponent(Pokemons)}/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);