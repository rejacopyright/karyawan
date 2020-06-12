import React, { Component, Fragment } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../assets/scss/calendar.scss'
// import '@date-io/moment'
import { DateRangePicker } from 'react-date-range'
import * as locales from 'react-date-range/dist/locale'

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
        <div className={`same-40 center pointer hover btn-sm btn-soft-primary radius-50`} data-toggle="modal" data-target={`#${this.props.id || 'selection'}`}> <i className={`uil ${this.props.icon || 'uil-calendar-alt'}`} /></div>
        <div className="modal fade" id={this.props.id || 'selection'} role="dialog" aria-hidden="true">
          <div className={`modal-dialog modal-dialog-centered ${this.props.modalClass}`}>
            <div className="modal-content p-2">
              <DateRangePicker
                ranges={[this.state]}
                locale={locales['id']}
                onChange={this.handleSelect.bind(this)}
                renderStaticRangeLabel={() => 'test'}
              />
              <div className="row">
                <div className="col text-right">
                  <span className="btn pointer btn-sm text-muted width-md" data-dismiss="modal">Kensel</span>
                  <span className="btn pointer btn-sm btn-soft-primary width-md" data-dismiss="modal" onClick={() => this.props.onChange(this.state)}>OKEY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default DateRange
