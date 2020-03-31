import React, {Component, Fragment} from 'react';
import Routes from './routes';
import guestRoutes from './routes/registerGuestRouter';
import Guest from './guest';
// Cookies
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Login from './auth/login';
// Assets
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/scss/bootstrap.scss';
import './assets/scss/icons.scss';
import './assets/scss/app.scss';
import './assets/scss/custom.scss';

class App extends Component  {
  componentDidMount() {
    document.title = 'Dashboard';
  }
  render() {
    return (
      <Fragment>
        {
          Cookies.getJSON('auth') && !guestRoutes.includes(window.location.pathname) ?
          <Routes /> :
          guestRoutes.includes(window.location.pathname) ?
          <Guest /> :
          <Login />
        }
      </Fragment>
    );
  }
}
export default connect(s => s)(App);
