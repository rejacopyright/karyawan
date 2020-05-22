import React, {Component} from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import PayrollAdd from './add'
import PayrollEdit from './edit'
import PayrollList from './list'
import BPJSKesehatan from './bpjsKesehatan'
import BPJSKetenagakerjaan from './bpjsKetenagakerjaan'
import Pph from './pph'
import PayrollUser from './user'
import feather from 'feather-icons'

function DefaultPage(){
  return(
    <div className="row">
      <div className="col-12 text-center mt-4">
        <img src={require('../../../assets/images/not-found.png')} alt="" width="250" style={{ filter: 'opacity(.25)' }} />
        <div className="d-block text-muted"><i className="uil uil-exclamation-circle mr-2" />Halaman yang anda cari tidak ditemukan atau sedang dalam perbaikan... !</div>
        <button type="button" className="btn btn-sm radius-5 btn-light pl-1 width-sm mt-3" onClick={() => window.history.back()}><i className="uil uil-arrow-left"/>BACK</button>
      </div>
    </div>
  )
}
class Payroll extends Component {
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
    active && c(active).remove('text-dark').add('bg-soft-primary').add('text-primary');
  }
  componentDidMount() {
    this.aktifkan();
    feather.replace();
  }
  componentDidUpdate(){
    this.aktifkan();
  }
  render(){
    return(
      <div className="content-page ou pt-1">
        <div className="content">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <Link to="/setting" className="center-left text-muted">
                  <i className="uil uil-arrow-left mr-2" /> Back
                </Link>
                <div className="email-container bg-transparent">
                  <div className="inbox-leftbar px-3 pt-0">
                    <h5>Select Payroll Type</h5>
                    <div className="mail-list mt-2" ref={i => this.menu = i}>
                      <Link to="/payroll/list" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="check-circle" className="icon-dual icon-xxs mr-2" /> Custom Payroll </Link>
                      <Link to="/payroll/bpjs/kesehatan" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="check-circle" className="icon-dual icon-xxs mr-2" /> BPJS Kesehatan </Link>
                      <Link to="/payroll/bpjs/ketenagakerjaan" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="check-circle" className="icon-dual icon-xxs mr-2" /> BPJS Ketenagakerjaan </Link>
                      <Link to="/payroll/overtime" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="check-circle" className="icon-dual icon-xxs mr-2" /> Overtime </Link>
                      <Link to="/payroll/pph" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="check-circle" className="icon-dual icon-xxs mr-2" /> PPH 21 </Link>
                      <Link to="/payroll/user" className="list-group-item center-left py-1 mb-0 text-9 border-0 btn text-dark"> <i data-feather="user" className="icon-dual icon-xxs mr-2" /> User View </Link>
                    </div>
                    <Link to="/payroll/add" className="btn btn-xs btn-blocks btn-soft-primary mt-3"><i className="uil uil-plus mr-1" />Add Payroll</Link>
                  </div>
                  <div className="inbox-rightbar">
                    <Switch>
                      <Route exact path="/payroll" component={PayrollList} />
                      <Route exact path="/payroll/add" component={PayrollAdd} />
                      <Route exact path="/payroll/list" component={PayrollList} />
                      <Route exact path="/payroll/list/:payroll_id" component={PayrollEdit} />
                      <Route exact path="/payroll/bpjs/kesehatan" component={BPJSKesehatan} />
                      <Route exact path="/payroll/bpjs/ketenagakerjaan" component={BPJSKetenagakerjaan} />
                      <Route exact path="/payroll/pph" component={Pph} />
                      <Route exact path="/payroll/user" component={PayrollUser} />
                      <Route exact path="/payroll/*" component={DefaultPage} />
                    </Switch>
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

export default Payroll
