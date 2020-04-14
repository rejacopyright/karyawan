import React from 'react';
// WIDGET
import User from './user';
import Grafik from './grafik';
import Ticket from './ticket';
// INIT JS
import feather from 'feather-icons';

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = 'Dashboard';
    feather.replace();
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <User rowClass="mt-3" />
            <Grafik rowClass="mt-2" />
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <Ticket />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
