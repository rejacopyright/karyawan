import React, { Component, Fragment } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// import '@date-io/moment'
import { DateRangePicker } from 'react-date-range'

class DateRange extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    key: this.props.id || 'selection'
  }
  handleSelect(r){
    this.setState({...r.selection})
  }
  render(){
    return (
      <Fragment>
        <div className="btn btn-sm btn-danger" data-toggle="modal" data-target={`#${this.props.id || 'selection'}`}>test</div>
        <div className="modal fade" id={this.props.id || 'selection'} role="dialog" aria-hidden="true">
          <div className={`modal-dialog modal-dialog-centered ${this.props.modalClass}`}>
            <div className="modal-content p-2">
              <DateRangePicker
                ranges={[this.state]}
                // months={2}
                onChange={this.handleSelect.bind(this)}
              />
              <div className={`modal-body ${this.props.contentClass}`}>
                {this.props.content}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default DateRange
