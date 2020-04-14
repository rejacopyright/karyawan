import React, {Fragment} from 'react'
import { Link } from "react-router-dom"

class Today extends React.Component {
  componentDidMount() {
    document.title = 'Absensi';
  }
  render () {
    return (
      <Fragment>
        <h5 className="mt-3 mb-2 text-10 text-success">Sudah Absen Hari ini</h5>
        <ul className="message-list">
          <li className="h-unset lh-unset radius-20">
            <div className="row m-0 p-2 align-items-center">
              <div className="col-atuo">
                <span className="same-25 radius-100 center oh">
                  <img src={require('../../assets/images/attached/img-1.jpg')} alt="" className="h-100"/>
                </span>
              </div>
              <div className="col-auto">
                <Link to={`/absen/detail/${1}`} className="text-primary f-600">Reja Jamil</Link>
              </div>
              <div className="col text-right">11:49 am</div>
              <div className="col-auto pr-0">
                <div data-toggle="tooltip" data-placement="top" title="Folder">
                  <span className="btn btn-xs btn-light radius-20 pointer same-25 p-0 center dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i className="uil uil-angle-down"></i> </span>
                  <div className="dropdown-menu l-unset r-0">
                    <span className="dropdown-header">Move to</span>
                    <a className="dropdown-item text-9" href="##">View</a>
                    <a className="dropdown-item text-9" href="##">Approve</a>
                    <a className="dropdown-item text-9 text-danger" href="##">Reject</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Fragment>
    )
  }
}

export default Today;
