import React from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import con from '../con/api';
// import moment from 'moment';
// import 'moment/locale/id';

class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    user: cookie.getJSON('user') || [],
    loading: true
  }
  componentDidMount() {
    console.log(this.state.user);
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/admin/detail/'+this.state.user.admin_id, {headers:con.headers})
    .then(res => {
      console.log(res.data);
      // this.setState({ user:res.data.user, loading:false });
    });
    document.title = 'My Account';
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    My Account
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
