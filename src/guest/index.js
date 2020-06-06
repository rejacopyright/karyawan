import React, {Component, Suspense} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
// INIT
import feather from 'feather-icons';
import TopBar from './topbar';
// ROUTES
const KiosK = React.lazy(() => import('./pages/kiosk'));
const KiosKv2 = React.lazy(() => import('./pages/car'));
const Display = React.lazy(() => import('./pages/display'));

class Routes extends Component {
  componentDidMount() {
    require('../assets/js/app');
    require('./app.scss');
    feather.replace();
  }
  componentWillUnmount() {
    delete require.cache[require.resolve('../assets/js/app')];
    delete require.cache[require.resolve('./app.scss')];
  }
  render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <TopBar />
          <Suspense fallback={<div>Loadings...</div>}>
            <Switch>
              {/* ROUTER */}
              <Route exact path="/kiosk" component={KiosK} />
              <Route exact path="/kiosk/v2" component={KiosKv2} />
              <Route exact path="/display" component={Display} />
              <Route exact path="/guest"> <h1>TEST GUEST ROUTES</h1> </Route>
              {/* HANDLE PAGE */}
              <Route exact path="*" component={KiosK} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    );
  }
}
export default Routes;
