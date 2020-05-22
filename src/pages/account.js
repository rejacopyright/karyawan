import React from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import con from '../con/api'
import Pagination from '../components/pagination'
// import moment from 'moment';
// import 'moment/locale/id';

class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    user: cookie.getJSON('user') || [],
    loading: true,
    device: [],
    page: 1,
    pagination:{},
  }
  dataUpdate(){
    axios.get(con.api+'/absen/test', {headers:con.headers, params:{page:this.state.page}}).then(res => {
      delete res.data.page.data;
      this.setState({ device:res.data.device, pagination: res.data.page });
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.dataUpdate();
    document.title = 'My Account';
  }
  pagination(e){
    this.setState({page:e}, this.dataUpdate);
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
                    Test...
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ol start={this.state.pagination.from}>
                  {
                    this.state.device.map((r, key) => (
                      <li key={key}>
                        <span className="mr-2 f-600">{r.user.name}</span>
                        <span className="text-muted text-8">({new Date(r.created_at).toString()})</span>
                      </li>
                    ))
                  }
                </ol>
              </div>
              <div className="col-12 text-center"><Pagination currentPage={this.state.pagination.current_page} lastPage={this.state.pagination.last_page} onClick={this.pagination.bind(this)} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
