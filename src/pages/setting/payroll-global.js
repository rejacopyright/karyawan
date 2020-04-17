import React, {Component} from 'react'

class PayrollGlobal extends Component {
  componentDidMount(){
    document.title = 'Global Payroll';
  }
  render(){
    return(
      <div className="row">
        <div className="col-12">
          this is Global payroll
        </div>
      </div>
    )
  }
}
export default PayrollGlobal
