import React from 'react'
import { Switch, Route, Link } from "react-router-dom"
// STATUS PAGES
import Today from "./today"
import Belum from "./belum"
import Ijin from "./ijin"
import Cuti from "./cuti"
import Detail from "./detail"
// import moment from 'moment'
// import 'moment/locale/id'
import feather from 'feather-icons'

class Absen extends React.Component {
  componentDidMount() {
    feather.replace();
  }
  render () {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <div className="email-container bg-transparent">
                  <div className="inbox-leftbar px-3 pt-0">
                    <h5>Absensi Karyawan</h5>
                    <div className="mail-list mt-2">
                      <Link to="/absen/belum" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="user-x" className="icon-dual icon-xxs mr-2" /> Belum Absen <span className="ml-auto text-9">7</span></Link>
                      <Link to="/absen" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="user-check" className="icon-dual icon-xxs mr-2" /> Sudah Absen <span className="ml-auto text-9">22</span></Link>
                      <Link to="/absen/ijin" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="users" className="icon-dual icon-xxs mr-2" /> Ijin / Sakit <span className="ml-auto text-9">2</span></Link>
                      <Link to="/absen/cuti" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="calendar" className="icon-dual icon-xxs mr-2" /> Cuti <span className="ml-auto text-9">2</span></Link>
                    </div>
                  </div>
                  <div className="inbox-rightbar">
                    <div className="btn-group my-2" style={{marginLeft: '-.6rem'}}>
                      <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Mark as spam"><i className="uil uil-exclamation-octagon"></i></button>
                      <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt"></i></button>
                      <button type="button" className="btn btn-sm text-dark dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i className="uil uil-folder"></i> <i className="uil uil-angle-down"></i> </button>
                      <div className="dropdown-menu">
                        <span className="dropdown-header">Move to</span>
                        <a className="dropdown-item" href="##">Social</a>
                        <a className="dropdown-item" href="##">Promotions</a>
                        <a className="dropdown-item" href="##">Updates</a>
                        <a className="dropdown-item" href="##">Forums</a>
                      </div>
                    </div>
                    <div className="btn-group mb-2" data-toggle="tooltip" data-placement="top" title="Folder">
                    </div>
                    <div className="mt-2">
                      <Switch>
                        <Route exact path="/absen" component={Today} />
                        <Route exact path="/absen/belum" component={Belum} />
                        <Route exact path="/absen/ijin" component={Ijin} />
                        <Route exact path="/absen/cuti" component={Cuti} />
                        <Route exact path="/absen/detail/:user_id" component={Detail} />
                      </Switch>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Absen;
