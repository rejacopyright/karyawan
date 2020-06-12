import React from 'react'
import { Switch, Route, Link } from "react-router-dom"
import axios from "axios"
import con from "../../con/api"
// STATUS PAGES
import Hadir from "./hadir"
import HadirUser from "./hadirUser"
import Absen from "./absen"
import Ijin from "./ijin"
import Cuti from "./cuti"
import Detail from "./detail"

// const DateValue = React.createContext(moment());
class Index extends React.Component {
  _isMounted = false;
  state = {
    hadir: '',
    absen: '',
    ijin: '',
    cuti: '',
  }
  aktifkan(){
    const c = elem => {
      const el = elem.classList;
      return {
        toggle: function(r){el.toggle(r);return this;},
        add:    function(r){el.add   (r);return this;},
        remove: function(r){el.remove(r);return this;}
      }
    }
    Array.from(this.menu.querySelectorAll('a')).map(r => c(r).remove('bg-soft-primary').remove('text-primary').add('text-dark'));
    const active = Array.from(this.menu.querySelectorAll('a')).find(r => this.props.location.pathname.includes(r.pathname));
    const act = active || Array.from(this.menu.querySelectorAll('a'))[0];
    c(act).remove('text-dark').add('bg-soft-primary').add('text-primary');
  }
  componentDidMount() {
    this.aktifkan();
    this._isMounted && axios.get(con.api+'/absen/count', {headers:con.headers}).then(res => {
      this.setState({ hadir: res.data.hadir, absen: res.data.absen, ijin: res.data.ijin, cuti: res.data.cuti });
    });
    this._isMounted && import('feather-icons').then(f => f.replace());
  }
  componentDidUpdate(){
    this.aktifkan();
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
                    <div className="mail-list mt-2" ref={i => this.menu = i}>
                      <Link to="/absen/hadir" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="user-check" className="icon-dual icon-xxs mr-2" /> Hadir <span className="ml-auto text-9">{this.state.hadir || ''}</span></Link>
                      <Link to="/absen/absen" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="user-x" className="icon-dual icon-xxs mr-2" /> Absen <span className="ml-auto text-9">{this.state.absen || ''}</span></Link>
                      <Link to="/absen/ijin" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="users" className="icon-dual icon-xxs mr-2" /> Ijin / Sakit <span className="ml-auto text-9">{this.state.ijin || ''}</span></Link>
                      <Link to="/absen/cuti" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="calendar" className="icon-dual icon-xxs mr-2" /> Cuti <span className="ml-auto text-9">{this.state.cuti || ''}</span></Link>
                    </div>
                  </div>
                  <div className="inbox-rightbar">
                    {/* <div className="btn-group my-2">
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
                    </div> */}
                    <div className="mt-2">
                      <Switch>
                        <Route exact path="/absen/hadir" component={Hadir} />
                        <Route exact path="/absen/:status/:user_id/:from/:to" component={HadirUser} />
                        <Route exact path="/absen/absen" component={Absen} />
                        <Route exact path="/absen/ijin" component={Ijin} />
                        <Route exact path="/absen/cuti" component={Cuti} />
                        <Route exact path="/absen/detail/:user_id" component={Detail} />
                        <Route path="/absen" component={Hadir} />
                      </Switch>
                      {/* <DateValue.Provider value={this.state.date}>
                      </DateValue.Provider> */}
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

// Hadir.contextType =
// Absen.contextType =
// Ijin.contextType =
// Cuti.contextType =
// DateValue;
export default Index;
