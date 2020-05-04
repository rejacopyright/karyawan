import React, {Component} from 'react'
import { Switch, Route, Link } from "react-router-dom"
import PayrollGlobal from "./global"
import PayrollUser from "./user"
import feather from 'feather-icons'

class Payroll extends Component {
  componentDidMount() {
    feather.replace();
  }
  render(){
    return(
      <div className="content-page">
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
                    <div className="mail-list mt-2">
                      <Link to="/payroll/global" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="globe" className="icon-dual icon-xxs mr-2" /> Global Payroll </Link>
                      <Link to="/payroll/user" className="list-group-item center-left border-0 px-0 py-1 text-9"> <i data-feather="user" className="icon-dual icon-xxs mr-2" /> User Payroll </Link>
                    </div>
                  </div>
                  <div className="inbox-rightbar">
                    <Switch>
                      <Route exact path="/payroll" component={PayrollGlobal} />
                      <Route exact path="/payroll/global" component={PayrollGlobal} />
                      <Route exact path="/payroll/user" component={PayrollUser} />
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
