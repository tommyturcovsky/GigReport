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
import Register from "./containers/loginProcess/register.container";
import ProfilePage from "./containers/profile/profilePage.container";
import ProfileEdit from "./containers/profile/editProfile.container";
import ReviewSearch from "./containers/reviewSearch.container";
import ArtistPage from "./containers/artistPage.container";
import GigReportCreate from "./containers/gigReport/gigReportCreate.container";
import GigReportEdit from "./containers/gigReport/gigReportEdit.container";
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
                <Route exact path="/profile/:username/edit" component={ProfileEdit} />
                <Route exact path="/gigReviewSearch" component={ReviewSearch} />
                <Route exact path="/artistPage/:spotifyId" component={ArtistPage} />
                <Route exact path="/gigReport/create/:spotifyId" component={GigReportCreate} />
                <Route exact path="/gigReport/edit/:reportId" component={GigReportEdit} />
                {/* <Route exact path="/pokemon" component={LoggedInComponent(Pokemons)}/> */}
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);