import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
class Footer extends Component {
  render() {
    return (
      <div className="left-side-menu">
        <div className="media user-profile bg-light mb-2 border-bottom border-primary">
          <img src={require("../assets/images/users/avatar.png")} className="avatar-sm rounded-circle mr-2" alt="Admin" />
          <img src={require("../assets/images/users/avatar.png")} className="avatar-xs rounded-circle mr-2" alt="Admin" />
          <div className="media-body oh">
            <h6 className="pro-user-name text-dark my-0">Reja Jamil</h6>
            <div className="pro-user-desc text-primary text-8 text-truncate">Administrator</div>
          </div>
          <div className="dropdown align-self-center profile-dropdown-menu">
            <Link className="dropdown-toggle mr-0" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
              <span data-feather="chevron-down" className="text-dark" />
            </Link>
            <div className="dropdown-menu profile-dropdown">
              <Link to="/account" className="dropdown-item notify-item">
                <i data-feather="user" className="icon-dual icon-xs mr-2"></i>
                <span>My Account</span>
              </Link>
              <Link to="#" className="dropdown-item notify-item">
                <i data-feather="settings" className="icon-dual icon-xs mr-2"></i>
                <span>Settings</span>
              </Link>
              <Link to="#" className="dropdown-item notify-item">
                <i data-feather="help-circle" className="icon-dual icon-xs mr-2"></i>
                <span>Support</span>
              </Link>
              <Link to="#" className="dropdown-item notify-item">
                <i data-feather="lock" className="icon-dual icon-xs mr-2"></i>
                <span>Lock Screen</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item notify-item" onClick={() => this.props.handleLogout()}>
                <i data-feather="log-out" className="icon-dual icon-xs mr-2"></i>
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebar-content">
          <div id="sidebar-menu" className="slimscroll-menu">
            <ul className="metismenu" id="menu-bar">
              <li> <Link to="/"> <i data-feather="home"></i> <span className="badge badge-danger float-right">1</span> <span> Dashboard </span> </Link> </li>
              <li> <Link to="/user"> <i data-feather="user" /> <span> User </span> </Link> </li>
              <li> <Link to="/absen"> <i data-feather="calendar" /> <span> Absensi </span> </Link> </li>
              <li> <Link to="/devices"> <i data-feather="monitor" /> <span> Display </span> </Link> </li>
              <li> <Link to="/setting"> <i data-feather="settings" /> <span> Pengaturan </span> </Link> </li>
              {/* <li className="menu-title">Components</li> */}
              {/* <li>
                <Link to="/el"> <i data-feather="package"></i> <span> UI Elements </span> <span className="menu-arrow"></span> </Link>
                <ul className="nav-second-level" aria-expanded="false">
                  <li> <Link to="/ui">Bootstrap UI</Link> </li>
                  <li>
                <Link to="/el/icons" aria-expanded="false">Icons <span className="menu-arrow"></span> </Link>
                <ul className="nav-third-level" aria-expanded="false">
                <li> <Link to="/el/icons/1">Feather Icons</Link> </li>
                <li> <Link to="/el/icons/2">Unicons Icons</Link> </li>
                </ul>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleLogout : () => dispatch({type:'LOGOUT'})
  }
}
export default connect(state => state, mapDispatch)(Footer);
