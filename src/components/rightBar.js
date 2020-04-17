import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="right-bar">
          <div className="rightbar-title p-3">
            <Link to="#" className="right-bar-toggle float-right text-muted"> <i data-feather="x" /> </Link>
            <h6 className="m-0 titlebar text-primary">{this.props.title}</h6>
          </div>
          <div className="slimscroll-menu contentbar p-3">
            {this.props.children}
          </div>
        </div>
        <div className="rightbar-overlay" />
      </Fragment>
    );
  }
}
export default Footer;
