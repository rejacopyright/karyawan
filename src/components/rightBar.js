import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="right-bar">
          <div className="rightbar-title p-3">
            <Link to="#" className="right-bar-toggle float-right text-gray"> <i className="uil uil-times text-14 lh-1" /> </Link>
            <h6 className="m-0 text-primary">{this.props.title}</h6>
          </div>
          <div className="slimscroll-menu px-3">
            {this.props.children}
          </div>
        </div>
        <div className="rightbar-overlay" />
      </Fragment>
    );
  }
}
export default Footer;
