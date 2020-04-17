import React, {Component} from 'react'
import { Switch, Route, Link } from "react-router-dom"
import PayrollGlobal from "./payroll-global"
import PayrollUser from "./payroll-user"
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
                <div className="email-container bg-transparent">
                  <div className="inbox-leftbar card shadow-sm p-2">
                    <div className="btn btn-soft-primary btn-block">Select Payroll Type</div>
                    <div className="mail-list mt-2">
                      <Link to="/payroll/global" className="list-group-item center-left border-0 f-400"> <i data-feather="globe" className="icon-dual-primary icon-xs mr-2" /> Global Payroll </Link>
                      <Link to="/payroll/user" className="list-group-item center-left border-0 f-400"> <i data-feather="user" className="icon-dual-warning icon-xs mr-2" /> User Payroll </Link>
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
