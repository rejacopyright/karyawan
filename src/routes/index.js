import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from './routes';
import Topbar from '../layouts/topbar';
import LeftMenu from '../layouts/leftMenu';
import RightMenu from '../layouts/rightMenu';

class Routes extends Component {
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
