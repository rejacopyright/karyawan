import React, {Component} from "react";
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
type Props = {}
type State = {
    open: boolean,
    range: DateRange
}
class App extends Component {
	state = {
		open: true,
		range: {}
	}
	render() {
		return (
      <div className="modal fade" id={this.props.id} role="dialog" aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered ${this.props.modalClass}`}>
          <div className="modal-content row p-0 m-0">
            <DateRangePicker
              open
              maxDate={new Date()}
              onChange={range => this.setState({ range: range })}
            />
          </div>
        </div>
      </div>
		);
	}
}

export default App;
