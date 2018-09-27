import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Header from '../Header';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AddVehiclePage from '../AddVehicle';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './app.css';

const App = () =>
  <Router>
    <div className="app">
      <Header/>
      <div className="view">
        <Navigation />
        <Route exact path={routes.LANDING} component={() => <LandingPage />} />
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={routes.HOME} component={() => <HomePage />} />
        <Route exact path={routes.ADD_VEHICLE} component={() => <AddVehiclePage />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      </div>
    </div>
  </Router>
export default withAuthentication(App);