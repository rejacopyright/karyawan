import React, {Fragment} from 'react'
import { Link } from "react-router-dom"
import con from "../../con/api"

class List extends React.Component {
  render () {
    return (
      <Fragment>
        <ul className="message-list mb-1">
          <li className="h-unset lh-unset radius-20">
            <div className="row m-0 p-2 align-items-center">
              <div className="col-atuo">
                <Link to={`/absen/detail/${this.props.userID}`} >
                  {
                    this.props.avatar ?
                      <div className="same-25 radius-100 center oh border border-gray bg-img" style={{ backgroundImage: `url('${con.img}/user/thumb/${this.props.avatar}')` }} />
                    :
                    <span className="same-25 radius-100 center oh border border-gray"> <img src={require('../../assets/images/attached/img-1.jpg')} alt="" className="h-100"/> </span>
                  }
                </Link>
              </div>
              <div className="col-auto">
                <Link to={`/absen/detail/${this.props.userID}`} className="text-primary f-600">{this.props.userName}</Link>
              </div>
              <div className="col text-truncate">
                <Link to={`/absen/detail/${this.props.userID}`} className="subject f-200">
                  {this.props.userDesc}
                </Link>
              </div>
              <div className="col-auto text-right text-success">{this.props.time}</div>
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

export default List;
