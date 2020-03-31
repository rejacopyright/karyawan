import React, {Component, Suspense} from 'react'
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import cookie from 'js-cookie';
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const UserList = React.lazy(() => import('../pages/user/userList'));
const UserAdd = React.lazy(() => import('../pages/user/userAdd'));
const UserEdit = React.lazy(() => import('../pages/user/userEdit'));
const UserDetail = React.lazy(() => import('../pages/user/userDetail'));
const MyAccount = React.lazy(() => import('../pages/account.js'));
class Routes extends Component {
  componentDidMount() {
    const expired =() => {
      if (!cookie.getJSON('auth')) {
        this.props.dispatch({type:'LOGOUT'});
      }
    }
    this.unlisten = this.props.history.listen((location, action) => {
      expired();
    });
    window.addEventListener('mouseover', expired);
    window.addEventListener('focus', expired);
  }
  componentWillUnmount() {
    this.unlisten();
    window.removeEventListener('mouseover', {});
    window.removeEventListener('focus', {});
  }
  render() {
    return (
      <Suspense fallback={<div>Loadings...</div>}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/add" component={UserAdd} />
          <Route exact path="/user/detail/:userId" component={UserDetail} />
          <Route exact path="/user/edit/:userId" component={UserEdit} />
          <Route exact path="/account" component={MyAccount} />
          {/* HANDLE PAGE */}
          <Route exact path="*" component={Dashboard} />
        </Switch>
      </Suspense>
    );
  }
}

export default connect()(withRouter(Routes));
