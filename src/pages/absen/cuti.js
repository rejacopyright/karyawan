import React, {Fragment} from 'react'
import { Link } from "react-router-dom"

class Belum extends React.Component {
  componentDidMount() {
    document.title = 'Karyawan Cuti';
  }
  render () {
    return (
      <Fragment>
        <h5 className="pb-2 mb-3 border-bottom border-2">List karyawan yang cuti absen hari ini</h5>
        <ul className="message-list">
          <li className="h-unset lh-unset radius-20">
            <div className="row m-0 p-2 align-items-center">
              <div className="col-atuo">
                <span className="same-25 radius-100 center oh">
                  <img src={require('../../assets/images/attached/img-1.jpg')} alt="" className="h-100"/>
                </span>
              </div>
              <div className="col-auto">
                <Link to={`/absen/detail/${2}`} className="text-primary f-600">Reja Jamil</Link>
              </div>
              <div className="col text-truncate">
                <Link to={`/absen/detail/${2}`} className="subject f-200">
                  Alasan Cuti...
                </Link>
              </div>
              <div className="col-auto text-right">11:49 am</div>
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

export default Belum;
