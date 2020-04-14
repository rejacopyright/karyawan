import React, {Fragment} from 'react'
import Calendar from '../../components/calendar'

class Today extends React.Component {
  componentDidMount() {
    // console.log(this.props.match.params.user_id);
    document.title = 'Absensi';
  }
  render () {
    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-auto col-12">
                <div className="same-75">
                  <img src={require("../../assets/images/users/avatar.png")} className="w-100" alt="cal" />
                </div>
              </div>
              <div className="col-md col-12 border-left border-1">
                <div className="">
                  <h5 className="mt-0 mb-1 font-weight-bold">Nama User</h5>
                  <p className="text-muted mb-2"> The calendar shows the events synced from all your linked calendars. Click on event to see or edit the details. You can create new event by clicking on "Create New event" button or any cell available in calendar below. </p>
                  <button className="btn btn-primary mt-2 mr-1" id="btn-new-event"><i className="uil-plus-circle"></i> Create New Event</button>
                  <button className="btn btn-white mt-2"><i className="uil-sync"></i> Link Calendars</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card radius-10 shadow">
          <div className="card-body">
            <Calendar />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Today;
