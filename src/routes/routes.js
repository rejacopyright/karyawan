import React, {Component, Suspense} from 'react'
import { Switch, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const UserList = React.lazy(() => import('../pages/user/userList'));
const UserAdd = React.lazy(() => import('../pages/user/userAdd'));
const UserEdit = React.lazy(() => import('../pages/user/userEdit'));
const UserDetail = React.lazy(() => import('../pages/user/userDetail'));
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loadings...</div>}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/add" component={UserAdd} />
          <Route exact path="/user/detail/:userId" component={UserDetail} />
          <Route exact path="/user/edit/:userId" component={UserEdit} />
          {/* HANDLE PAGE */}
          <Route exact path="*" component={Dashboard} />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
