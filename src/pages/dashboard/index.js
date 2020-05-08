import React from 'react'
// LIB
import axios from 'axios'
import con from '../../con/api'
import { ClassicSpinner } from "react-spinners-kit";
// WIDGET
import User from './user'
import Grafik from './grafik'
// import Ticket from './ticket'
// INIT JS
import feather from 'feather-icons'

class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    loading: true,
    total:0,
    hadir:0,
    absen:0,
  }
  realtime(){
    axios.get(con.api+'/dashboard', {headers:con.headers}).then(res => {
      this.setState({
        loading: false,
        total:res.data.total_user,
        hadir:res.data.user_hadir,
        absen:res.data.user_absen,
      });
    });
  }
  componentDidMount() {
    document.title = 'Dashboard';
    feather.replace();
    this.timerID = setInterval( () => this.realtime(), 1000 );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
            <div className="row mt-3">
              <User divClass="col-xl-2 col-md-3" title="Total Karyawan" value={this.state.total} theme="primary" icon="users" />
              <User divClass="col-xl-2 col-md-3" title="Karyawan Hadir" value={this.state.hadir} theme="success" icon="user-check" />
              <User divClass="col-xl-2 col-md-3" title="Karyawan Absen" value={this.state.absen} theme="danger" icon="user-x" />
            </div>
            <Grafik rowClass="mt-2" />
            {/* <div className="row">
              <div className="col-md-4 col-sm-6">
                <Ticket />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
