import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="right-bar">
          <div className="rightbar-title">
            <Link to="#" className="right-bar-toggle float-right"> <i data-feather="x-circle" /> </Link>
            <h5 className="m-0">Customization</h5>
          </div>
          <div className="slimscroll-menu">
            <h5 className="font-size-16 pl-3 mt-4"> Choose Variation </h5>
            <div className="p-3">
              <h6>Default</h6>
              <Link to="#"> <img src={require("../assets/images/layouts/vertical.jpg")} alt="vertical" className="img-thumbnail demo-img" /> </Link>
            </div>
            <div className="px-3 py-1">
              <h6> Top Nav </h6>
              <Link to="#"> <img src={require("../assets/images/layouts/horizontal.jpg")} alt="horizontal" className="img-thumbnail demo-img" /> </Link>
            </div>
          </div>
        </div>
        <div className="rightbar-overlay" />
      </Fragment>
    );
  }
}
export default Footer;
