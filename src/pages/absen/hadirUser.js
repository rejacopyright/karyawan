import React, {Fragment} from 'react'
import axios from "axios"
import con from "../../con/api"
import List from "./list"
// Date
import moment from "moment"
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
class HadirUser extends React.Component {
  _isMounted = false;
  state = {
    hadir:[],
    loading: true,
    page:1,
    pagination:{},
    params:{
      page:1,
      user_id: this.props.match.params.user_id,
      from: moment.unix(this.props.match.params.from/1000),
      to: moment.unix(this.props.match.params.to/1000),
      q:this.props.search || null,
      sortby: 'checkin',
      type: 'desc'
    }
  }
  dataset(){
    axios.get(con.api+'/absen/hadir/user', {headers:con.headers, params:{...this.state.params, user_id:this.state.params.user_id, from:this.state.params.from.format('Y-MM-DD'), to:this.state.params.to.format('Y-MM-DD')} }).then(res => {
      this.setState({ user: res.data.user, hadir: res.data.hadir, pagination: res.data.page, loading: false });
    });
  }
  pagination(e){
    this.setState({params:{...this.state.params, page:e}, loading: true}, this.dataset);
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.dataset();
    this._isMounted && import('feather-icons').then(f => f.replace());
    document.title = 'Absen Hari Inix';
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onDateRangeChange(r){
    this.setState({params:{...this.state.params, from:moment(r.startDate), to:moment(r.endDate)}, loading: true}, this.dataset);
    console.log(r.startDate);
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
              <span className="center pr-2 mr-2 border-right pointer" onClick={() => this.props.history.push('/absen/hadir')}><i className="uil uil-arrow-left"/></span>
              <span className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'checkin' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`} onClick={this.sortby.bind(this, 'checkin')} >
                Sort By Date {this.state.params.sortby === 'checkin' ? this.state.params.type === 'desc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="center">
          <h5 className="col pb-2 pl-0 mb-3 border-bottom border-2">
            <div className="center-left">
              { this.state.user &&
                <Fragment>
                  <div className="same-40 radius-100 center oh border border-gray bg-img mr-3" style={{ backgroundImage: `url('${con.img}/user/thumb/${this.state.user.avatar}')` }} />
                  <div className="mr-3">
                    <p className="lh-1 m-0">{this.state.user.name}</p>
                    <p className="lh-12 m-0 text-10 text-muted">@{this.state.user.username}</p>
                  </div>
                </Fragment>
              }
              <div className="text-primary text-9">
                <i className="uil uil-calendar-alt mr-2" />
                {
                  this.state.params.from.format('YMD') === this.state.params.to.format('YMD') ?
                  this.state.params.from.format('dddd, D MMMM Y')
                  :
                  this.state.params.from.format('dddd, D MMMM Y') +' - '+ this.state.params.to.format('dddd, D MMMM Y')
                }
              </div>
            </div>
          </h5>
        </div>
        {
          this.state.loading ? [1,2,3].map(key => <Loading key={key} />) :
          this.state.hadir.map((r, key) => (
            <List
              key={key}
              name={moment(r.created_at).format('dddd, D MMMM Y')}
              userName={<div className="mt-1 text-primary f-600">{moment(r.created_at).format('HH:mm')}</div>}
              // userDesc={`${r.count}x Terdeteksis`}
              avatar={r.img} />
          ))
        }
        { !this.state.loading && <div className="mt-3 text-center"><Pagination currentPage={this.state.pagination.current_page} lastPage={this.state.pagination.last_page} onClick={this.pagination.bind(this)} /></div> }
      </Fragment>
    )
  }
}

export default HadirUser;
