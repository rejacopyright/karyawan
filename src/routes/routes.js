import React, {Component, Suspense} from 'react'
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
// Dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard/index'));
// User
const UserList = React.lazy(() => import('../pages/user/userList'));
const UserAdd = React.lazy(() => import('../pages/user/userAdd'));
const UserEdit = React.lazy(() => import('../pages/user/userEdit'));
const UserDetail = React.lazy(() => import('../pages/user/userDetail'));
// Account
const MyAccount = React.lazy(() => import('../pages/account.js'));
// Absen
const Absen = React.lazy(() => import('../pages/absen/index'));
// Settings
const Setting = React.lazy(() => import('../pages/setting/index'));
const Jabatan = React.lazy(() => import('../pages/setting/jabatan/index'));
const Payroll = React.lazy(() => import('../pages/setting/payroll/index'));
const AdminRole = React.lazy(() => import('../pages/setting/role/index'));
// Devices
const Devices = React.lazy(() => import('../pages/devices/index'));
// Pages
const PageNotFound = React.lazy(() => import('../layouts/pageNotFound'));

class Routes extends Component {
  componentDidMount() {
    const expired =() => {
      if (!cookie.getJSON('auth')) {
        this.props.dispatch({type:'LOGOUT'});
      }
    }
    this.unlisten = this.props.history.listen((location, action) => {
      document.querySelector('#search').value = '';
      this.props.dispatch({type:'SEARCH', value: ''});
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
          <Route exact path="/user" component={UserList} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/add" component={UserAdd} />
          <Route exact path="/user/detail/:userId" component={UserDetail} />
          <Route exact path="/user/edit/:userId" component={UserEdit} />
          <Route path="/absen" component={Absen} />
          <Route exact path="/account" component={MyAccount} />
          <Route exact path="/devices" component={Devices} />
          <Route exact path="/setting" component={Setting} />
          <Route path="/payroll" component={Payroll} />
          <Route path="/jabatan" component={Jabatan} />
          <Route path="/role" component={AdminRole} />
          {/* HANDLE PAGE */}
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    );
  }
}

export default connect()(withRouter(Routes));
