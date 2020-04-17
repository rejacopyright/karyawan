import React, {Component} from 'react'

class PayrollGlobal extends Component {
  componentDidMount(){
    document.title = 'Global Payroll';
  }
  render(){
    return(
      <div className="row">
        <div className="col-12">
          this is User payroll by ID
        </div>
      </div>
    )
  }
}
export default PayrollGlobal
