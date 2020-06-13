import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import con from "../../con/api"
import List from "./list"
import { ClassicSpinner } from "react-spinners-kit";
// Date
import moment from "moment"
import DateRange from '../../components/dateRange'
import Skeleton from 'react-skeleton-loader'
import Pagination from '../../components/pagination'

// Export
import XLSX from 'xlsx'

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
    pageload: false,
    page:1,
    pagination:{},
    params:{
      page:1,
      from: moment(),
      to: moment(),
      q:this.props.search || null,
      sortby: 'name',
      type: 'asc'
    }
  }
  dataset(){
    axios.get(con.api+'/absen/hadir', {headers:con.headers, params:{...this.state.params, from:this.state.params.from.format('Y-MM-DD'), to:this.state.params.to.format('Y-MM-DD')} }).then(res => {
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
  exportPDF(){
    console.log('export PDF');
  }
  exportExcel(){
    this.setState({pageload:true});
    const dataset = [['No.', 'ID', 'Nama', 'Jabatan', 'Tanggal', 'Jam Masuk', 'Jam Pulang']];
    axios.get(con.api+'/absen/hadir/export', {headers:con.headers, params:{...this.state.params, from:this.state.params.from.format('Y-MM-DD'), to:this.state.params.to.format('Y-MM-DD')} }).then(res => {
      res.data.hadir.map(a => {
        let res = (({user_id, name, jabatan, created_at, first_capture, last_capture}) => ({user_id, name, jabatan, created_at, first_capture, last_capture}))(a);
        return res;
      }).map((rj, no) => {
        return dataset.push([no+1, 'R-'+(rj.user_id).toString().padStart(8,'0'), rj.name, rj.jabatan, moment(rj.created_at).format('DD-MM-Y'), moment(rj.first_capture).format('HH:mm'), moment(rj.last_capture).format('HH:mm')]);
      });
      // console.log(dataset);
      const filename = this.state.params.from.format('YMD') === this.state.params.to.format('YMD') ? this.state.params.from.format('DD-MM-Y') : `${this.state.params.from.format('DD-MM-Y')} - ${this.state.params.to.format('DD-MM-Y')}`;
      const ws = XLSX.utils.aoa_to_sheet(dataset);
  		const wb = XLSX.utils.book_new();
  		XLSX.utils.book_append_sheet(wb, ws, filename);
  		XLSX.writeFile(wb, `Data Karyawan Hadir (${filename}).xlsx`);
    }).then(() => this.setState({pageload:false}));
  }
  render () {
    return (
      <Fragment>
        { this.state.pageload && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <div className="center">
          <div className="col pl-0">
            <div className="btn-group my-2">
              <span className="center pr-2 mr-2 border-right"><i className="uil uil-filter"/></span>
              <span className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'name' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`} onClick={this.sortby.bind(this, 'name')} >
                Name {this.state.params.sortby === 'name' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
              <span className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'counter' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`} onClick={this.sortby.bind(this, 'counter')} >
                Counter {this.state.params.sortby === 'counter' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
              <span className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'checkin' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`} onClick={this.sortby.bind(this, 'checkin')} >
                Check-In {this.state.params.sortby === 'checkin' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
              <span className={`btn pointer center btn-xs py-0 ${this.state.params.sortby === 'checkout' ? 'btn-soft-primary' : 'btn-soft-secondary'} radius-50 hover mr-1 text-nowrap`} onClick={this.sortby.bind(this, 'checkout')} >
                Check-Out {this.state.params.sortby === 'checkout' ? this.state.params.type === 'asc' ? <i className="uil text-9 uil-arrow-up ml-1"/> : <i className="uil text-9 uil-arrow-down ml-1"/> : ''}
              </span>
            </div>
          </div>
          <div className="col text-right">
            <div className="btn-group">
              <span className="btn pointer center btn-xs radius-10 hover btn-soft-danger mr-2" onClick={this.exportPDF.bind(this)} > <i className="uil text-9 uil-file-download mr-1"/> PDF </span>
              <span className="btn pointer center btn-xs radius-10 hover btn-soft-success" onClick={this.exportExcel.bind(this)} > <i className="uil text-9 uil-file-download-alt mr-1"/> Excel </span>
            </div>
          </div>
        </div>
        <div className="center">
          <h5 className="col pb-2 pl-0 mb-3 border-bottom border-2">
            <i data-feather="user-check" className="icon-dual icon-xs mb-1 mr-2" />
            List karyawan yang hadir
            <span className="text-primary text-8">
              {
                this.state.params.from.format('YMD') === this.state.params.to.format('YMD') ?
                ` (${this.state.params.from.format('dddd, D MMMM Y')})`
                :
                ` (${this.state.params.from.format('dddd, D MMMM Y')} - ${this.state.params.to.format('dddd, D MMMM Y')})`
              }
            </span>
          </h5>
          <div className="same-50 pr-0 text-right border border-1 radius-50 center">
            <DateRange onChange={this.onDateRangeChange.bind(this)} />
          </div>
        </div>
        {
          this.state.loading ? [1,2,3].map(key => <Loading key={key} />) :
          this.state.user.map((r, key) => (
            <List
              key={key}
              link={`/absen/hadir/${r.user.user_id}/${this.state.params.from.format('x')}/${this.state.params.to.format('x')}`}
              name={r.user.name}
              userName={r.user.username}
              userDesc={`${r.count}x Terdeteksi`}
              time={[moment(r.first_capture).format('dddd, D MMMM Y'), ' (', <span className="f-700" key={key}><span className="text-success">{moment(r.first_capture).format('HH:mm')}</span> - <span className="text-danger">{moment(r.last_capture).format('HH:mm')}</span></span>, ')']}
              avatar={r.img} />
          ))
        }
        { !this.state.loading && <div className="mt-3 text-center"><Pagination currentPage={this.state.pagination.current_page} lastPage={this.state.pagination.last_page} onClick={this.pagination.bind(this)} /></div> }
      </Fragment>
    )
  }
}

export default connect(s => s)(Hadir);
