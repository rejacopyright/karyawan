import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import con from '../con/api'
import Logo from '../assets/images/logo-letter.png'

class TopBar extends Component {
  state = {
    setting:{}
  }
  componentDidMount() {
    axios.get(con.api+'/setting', {headers: con.headers}).then(res => {
      this.setState({ setting: res.data });
    });
  }
  render() {
    return (
      <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
        <div className="container-fluid">
          <Link to="#" className="navbar-brand mr-0 mr-md-2 logo">
            <span className="logo-lg">
              <img src={Logo} alt="img" height={24} />
              {/* <span className="d-inline h5 ml-1 text-logo">{this.props.setting.name || this.state.setting.name || '-'} </span> */}
            </span>
            <span className="logo-sm"> <img src={Logo} alt="img" height={24} /> </span>
          </Link>
          <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
            <li>
              <button className="button-menu-mobile open-left disable-btn">
                <i data-feather="menu" className="menu-icon" />
                <i data-feather="x" className="close-icon" />
              </button>
            </li>
          </ul>
          <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
            <li className="d-none d-sm-block">
              <div className="app-search">
                <form>
                  <div className="input-group">
                    <input type="text" id="search" className="form-control" placeholder="Search..." onChange={e => this.props.dispatch({type:'SEARCH', value:e.target.value})} />
                    <span data-feather="search" />
                  </div>
                </form>
              </div>
            </li>
            <li className="dropdown d-none d-lg-block" data-toggle="tooltip" data-placement="left" title="Change language">
              <Link className="nav-link dropdown-toggle mr-0" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false"> <i data-feather="globe" /> </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="#" className="dropdown-item notify-item">
                  <img src={require('../assets/images/flags/germany.jpg')} alt="user" className="mr-2" height={12} />
                  <span className="align-middle">German</span>
                </Link>
                <Link to="#" className="dropdown-item notify-item">
                  <img src={require('../assets/images/flags/italy.jpg')} alt="user" className="mr-2" height={12} />
                  <span className="align-middle">Italian</span>
                </Link>
              </div>
            </li>
            <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="8 new unread notifications">
              <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
                <i data-feather="bell" />
                <span className="noti-icon-badge" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right dropdown-lg">
                <div className="dropdown-item noti-title border-bottom">
                  <h5 className="m-0 font-size-16">
                    <span className="float-right">
                      <Link to="#" className="text-dark">
                        <small> Clear All </small>
                      </Link>
                    </span>
                    Notification
                  </h5>
                </div>
                <div className="slimscroll noti-scroll">
                  <Link to="#" className="dropdown-item notify-item border-bottom">
                    <div className="notify-icon">
                      <img src={require('../assets/images/users/avatar-1.jpg')} className="img-fluid rounded-circle" alt="img" />
                    </div>
                    <p className="notify-details"> Reja </p>
                    <p className="text-muted mb-0 user-msg"> <small> Wow ! this admin looks good and awesome design </small> </p>
                  </Link>
                  <Link to="#" className="dropdown-item notify-item border-bottom">
                    <div className="notify-icon">
                      <img src={require('../assets/images/users/avatar-2.jpg')} className="img-fluid rounded-circle" alt="img" />
                    </div>
                    <p className="notify-details"> Jamil </p>
                    <p className="text-muted mb-0 user-msg">
                      <small> Hi, How are you? What about our next meeting </small>
                    </p>
                  </Link>
                </div>
                <Link to="#" className="dropdown-item text-center text-primary notify-item notify-all border-top">
                  View all
                  <i className="fi-arrow-right" />
                </Link>
              </div>
            </li>
            <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="Settings">
              <Link to="#" className="nav-link right-bar-toggle"> <i data-feather="settings" /> </Link>
            </li>
            <li className="dropdown notification-list align-self-center profile-dropdown">
              <Link className="nav-link dropdown-toggle nav-user mr-0" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
                <div className="media user-profile ">
                  <img src={require('../assets/images/users/avatar-7.jpg')} alt="user" className="rounded-circle align-self-center" />
                  <div className="media-body text-left">
                    <h6 className="pro-user-name ml-2 my-0">
                      <span> Shreyu N </span>
                      <span className="pro-user-desc text-muted d-block mt-1">Administrator </span>
                    </h6>
                  </div>
                  <span data-feather="chevron-down" className="ml-2 align-self-center" />
                </div>
              </Link>
              <div className="dropdown-menu profile-dropdown-items dropdown-menu-right">
                <Link to="#" className="dropdown-item notify-item">
                  <i data-feather="user" className="icon-dual icon-xs mr-2" />
                  <span> My Account </span>
                </Link>
                <Link to="#" className="dropdown-item notify-item">
                  <i data-feather="settings" className="icon-dual icon-xs mr-2" />
                  <span>Settings</span>
                </Link>
                <Link to="#" className="dropdown-item notify-item">
                  <i data-feather="help-circle" className="icon-dual icon-xs mr-2" />
                  <span>Support</span>
                </Link>
                <Link to="#" className="dropdown-item notify-item">
                  <i data-feather="lock" className="icon-dual icon-xs mr-2" />
                  <span> Lock Screen </span>
                </Link>
                <div className="dropdown-divider" />
                <Link to="#" className="dropdown-item notify-item">
                  <i data-feather="log-out" className="icon-dual icon-xs mr-2" />
                  <span>Logout</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default connect(s => s)(TopBar);
