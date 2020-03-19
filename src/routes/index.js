import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from './routes';
import Topbar from '../layouts/topbar';
import LeftMenu from '../layouts/leftMenu';
import RightMenu from '../layouts/rightMenu';

class Routes extends Component {
  componentDidMount() {
    // WS
    // const socket = new WebSocket('ws://localhost:3000');
    // socket.addEventListener('open', function (event) {
    //   socket.send('Hello Server!');
    // });
    // socket.addEventListener('message', function (event) {
    //   console.log('Message from server ', event.data);
    // });
    console.log('whers');
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
