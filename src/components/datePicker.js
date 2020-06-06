import React, {Component} from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

class Picker extends Component {
  state = {
    selectedDate: new Date(),
    isOpen:false
  }
  static getDerivedStateFromProps(props, state) {
    return {
      selectedDate: props.defaultValue
    }
  }
  handleDateChange(e){
    this.setState({ selectedDate:e.toDate() }, () => this.props.onChange(e, this.props.name || false) );
  }
  render () {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <button type="button" className={`btn ${this.props.className}`} onClick={() => this.setState({ isOpen:true })}>
          <i className={`uil uil-calendar-alt ${this.props.showDate && 'mr-1'}`} />
          {this.props.showDate && moment(this.state.selectedDate).format('HH:mm')}
        </button>
        <DatePicker
          open={this.state.isOpen}
          onOpen={() => this.setState({ isOpen:true })}
          onClose={() => this.setState({ isOpen:false })}
          variant="dialog"
          label="Jam Masuk"
          inputVariant="outlined"
          hidden={true}
          ampm={false}
          minutesStep={5}
          maxDate={this.props.maxDate}
          disableFuture={this.props.disableFuture}
          disablePast={this.props.disablePast}
          showTodayButton={this.props.showToday}
          value={this.state.selectedDate}
          onChange={this.handleDateChange.bind(this)}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default Picker;
