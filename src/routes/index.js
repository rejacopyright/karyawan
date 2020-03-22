import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from './routes';
import Topbar from '../layouts/topbar';
import LeftMenu from '../layouts/leftMenu';
import RightMenu from '../layouts/rightMenu';
// INIT JS
import feather from 'feather-icons';

class Routes extends Component {
  componentDidMount() {
    require('../assets/js/app');
    feather.replace();
  }
  componentWillUnmount() {
    delete require.cache[require.resolve('../assets/js/app')];
  }
  render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <Topbar />
          <LeftMenu />
          <AllRoutes />
        </div>
        <RightMenu />
      </BrowserRouter>
    );
  }
}
export default Routes;
