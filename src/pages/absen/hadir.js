import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import con from "../../con/api"
import List from "./list"
// Date
import moment from 'moment'
import 'moment/locale/id'
import DatePicker from '../../components/datePicker'
import DateRange from '../../components/dateRange'
import Skeleton from 'react-skeleton-loader'
import Pagination from '../../components/pagination'

const Loading = () => (
  <div className="row align-items-center mb-0 mt-3">
    <div className="col-auto pr-0">
      <Skeleton width="35px" height="35px" count={1} widthRandomness={0} color="#eee" borderRadius="100px" />
    </div>
    <div className="col">
      <Skeleton width="100%" height="10px" count={2} widthRandomness={0} color="#eee" />
    </div>
  </div>
)
class Hadir extends React.Component {
  _isMounted = false;
  state = {
    user:[],
    loading: true,
    page:1,
    pagination:{},
    params:{
      page:1,
      date: moment(),
      q:this.props.search || null,
      sortby: 'name',
      type: 'asc'
    }
  }
  dataset(){
    axios.get(con.api+'/absen/hadir', {headers:con.headers, params:{...this.state.params, date:this.state.params.date.format('YYYY-MM-DD')} }).then(res => {
      this.setState({ user: res.data.hadir, pagination: res.data.page, loading: false });
    });
  }
  pagination(e){
    this.setState({params:{...this.state.params, page:e}, loading: true}, this.dataset);
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.dataset();
    this._isMounted && import('feather-icons').then(f => f.replace());
    document.title = 'Absen Hari Ini';
  }
  componentDidUpdate(prev){
    if (this.props.search !== prev.search && this._isMounted) {
      this.setState({params:{...this.state.params, q:this.props.search}, loading: true}, this.dataset);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onDateChange(m){
    this.setState({params:{...this.state.params, date:m}, loading: true}, this.dataset);
  }
  sortby(e){
    const sortby = this.state.params.sortby;
    const type = this.state.params.type;
    if (sortby === e) {
      switch (type) {
        case 'asc':
          this.setState({params:{...this.state.params, type:'desc'}, loading: true}, this.dataset);
          break;
        case 'desc':
          this.setState({params:{...this.state.params, type:'asc'}, loading: true}, this.dataset);
          break;
        default:
      }
    }else {
      this.setState({params:{...this.state.params, sortby:e, type:'asc'}, loading: true}, this.dataset);
    }
    console.log(sortby === e);
  }
  render () {
    return (
      <Fragment>
        <div className="center">
          <div className="col pl-0">
            <div className="btn-group my-2">
              <span className="center pr-2 mr-2 border-right"><i className="uil uil-filter"/></span>
              <span
                className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'name' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`}
                onClick={this.sortby.bind(this, 'name')}
                >
                  Name
                {this.state.params.sortby === 'name' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
              <span
                className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'counter' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`}
                onClick={this.sortby.bind(this, 'counter')}
                >
                  Counter
                {this.state.params.sortby === 'counter' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
              <span
                className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'checkin' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`}
                onClick={this.sortby.bind(this, 'checkin')}
                >
                  Check-In
                {this.state.params.sortby === 'checkin' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
                <span
                className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'checkout' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`}
                onClick={this.sortby.bind(this, 'checkout')}
                >
                  Check-Out
                {this.state.params.sortby === 'checkout' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="center">
          <h5 className="col pb-2 pl-0 mb-3 border-bottom border-2"><i data-feather="user-check" className="icon-dual icon-xs mb-1 mr-2" />List karyawan yang hadir <span className="text-primary text-10">({this.state.params.date.format('dddd, D MMMM YYYY')})</span></h5>
          <span className="same-50 radius-50 pointer" data-toggle="modal" data-target="#dateRange"><i className="uil uil-trash"/></span>
          <DateRange id="dateRange"/>
          <div className="same-50 pr-0 text-right border border-1 radius-50 center">
            <DatePicker
              name="date"
              className={`btn-sm btn-soft-primary radius-50 hover`}
              defaultValue={this.state.params.date}
              disableFuture
              showToday
              onChange={this.onDateChange.bind(this)}
            />
          </div>
        </div>
        {
          this.state.loading ? [1,2,3].map(key => <Loading key={key} />) :
          this.state.user.map((r, key) => (
            <List
              key={key}
              userID={1}
              name={r.user.name}
              userName={r.user.username}
              userDesc={`${r.count}x Terdeteksi`}
              time={[moment(r.first_capture).format('HH:mm'), ' - ', <span className="text-danger f-700" key={key}>{moment(r.last_capture).format('HH:mm')}</span>]}
              avatar={r.img} />
          ))
        }
        { !this.state.loading && <div className="mt-3 text-center"><Pagination currentPage={this.state.pagination.current_page} lastPage={this.state.pagination.last_page} onClick={this.pagination.bind(this)} /></div> }
      </Fragment>
    )
  }
}

export default connect(s => s)(Hadir);
