import React, {Component} from 'react';
import Routes from './routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/js/app';
import './assets/scss/bootstrap.scss';
import './assets/scss/icons.scss';
import './assets/scss/app.scss';
import './assets/scss/custom.scss';

class App extends Component  {
  render() {
    return (
      <Routes />
    );
  }
}
export default App;
