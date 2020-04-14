import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

class Time extends React.Component {
  state = {
    selectedDate: new Date(Math.round(new Date().getTime() / (1000*60*5)) * (1000*60*5)),
    isOpen:false
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ selectedDate: props.defaultValue });
  }
  handleDateChange(e){
    this.setState({ selectedDate:e.toDate() }, () => this.props.onChange(e, this.props.name || false) );
  }
  render () {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <button type="button" className={`btn ${this.props.className}`} onClick={() => this.setState({ isOpen:true })}> <i className="uil uil-clock" /> {moment(this.state.selectedDate).format('HH:mm')} </button>
        <TimePicker
          open={this.state.isOpen}
          onOpen={() => this.setState({ isOpen:true })}
          onClose={() => this.setState({ isOpen:false })}
          variant="dialog"
          label="Jam Masuk"
          inputVariant="outlined"
          hidden={true}
          ampm={false}
          minutesStep={5}
          value={this.state.selectedDate}
          onChange={this.handleDateChange.bind(this)}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default Time;
