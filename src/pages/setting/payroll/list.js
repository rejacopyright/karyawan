import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import con from '../../../con/api'
import Pagination from '../../../components/pagination'
import Skeleton from 'react-skeleton-loader'
import { connect } from 'react-redux'

const Menu = () => (
  <Fragment>
    <div className="btn-group my-2" style={{marginLeft: '-.6rem'}}>
      <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Mark as spam"><i className="uil uil-exclamation-octagon"></i></button>
      <button type="button" className="btn btn-sm text-dark" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt"></i></button>
      <button type="button" className="btn btn-sm text-dark dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i className="uil uil-folder"></i> <i className="uil uil-angle-down"></i> </button>
      <div className="dropdown-menu">
        <span className="dropdown-header">Type</span>
        <span className="dropdown-item text-9 pointer"><i className="uil uil-plus-circle mr-1" />Increment</span>
        <span className="dropdown-item text-9 pointer text-danger"><i className="uil uil-minus-circle mr-1" />Decrement</span>
      </div>
    </div>
  </Fragment>
);
const Loading = () => {
  return [1,2,3,4].map(key => (
    <div className="row align-items-center mb-0 mt-2" key={key}>
      <div className="col-auto pr-0">
        <Skeleton width="35px" height="35px" count={1} widthRandomness={0} color="#eee" borderRadius="100px" />
      </div>
      <div className="col">
        <Skeleton width="100%" height="10px" count={2} widthRandomness={0} color="#eee" />
      </div>
    </div>
  ))
}
class PayrollList extends Component {
  _isMounted = false;
  state = {
    payroll:[],
    page:1,
    pagination:{},
    search:'',
    payroll_self:{},
    loading:true,
    loadingUpdate:false
  }
  dataUpdate(){
    axios.get(con.api+'/payroll', {headers:con.headers, params:{page:this.state.page, q: this.props.search} }).then(res => {
      this.setState({ payroll:res.data.payroll, pagination: res.data.page, loading:false });
    });
  }
  pagination(e){
    this.setState({page:e}, this.dataUpdate);
  }
  componentDidMount(){
    this._isMounted = true;
    document.title = "Payroll's List";
    this._isMounted && this.dataUpdate();
  }
  componentDidUpdate(prev){
    if (this.props.search !== prev.search) {
      this.dataUpdate();
    }
  }
  render(){
    return(
      <Fragment>
        <Menu />
        <div className="row">
          <div className="col-12">
            <h5 className="pb-2 mb-3 border-bottom border-2">Payroll's List</h5>
            { this.state.loading && <Loading /> }
            {
              this.state.payroll.map((r, key) => (
                <ul className="message-list mb-1" key={key}>
                  <Link to={`/payroll/list/${r.payroll_id}`}>
                    <li className="h-unset lh-unset radius-5">
                      <div className="row m-0 p-2 align-items-center pointer">
                        <div className="col-auto px-0">
                          <div className="center same-20 radius-20 bg-light text-7 f-600 lh-auto">
                            {this.state.pagination.from + key}
                          </div>
                        </div>
                        <div className="col col-md-4">
                          <div className="text-dark text-9 text-nowrap f-600 lh-1">
                            {
                              r.type ?
                              <span className="">{r.name}</span> :
                              <span className="badge badge-soft-danger text-9">{r.name}</span>
                            }
                          </div>
                        </div>
                        <div className="col text-truncate">
                          <div className="subject text-truncate text-8 f-600">
                            {
                              r.percent ?
                              <span className="badge badge-soft-success text-9">{r.value} %</span>
                              :
                              <div className="text-secondary">Rp. {(parseFloat(r.value)).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</div>
                            }
                          </div>
                        </div>
                        <div className="col-auto text-right text-8">
                          {
                            r.all_jabatan ?
                            <span className="text-muted">Semua Jabatan</span> :
                            <span className="badge badge-soft-primary">Sebagian Jabatan</span>
                          }
                        </div>
                        <div className="col-auto pr-0">
                          <div data-toggle="tooltip" data-placement="top" title="Folder">
                            <span className="btn btn-xs text-dark radius-20 pointer same-25 p-0 center dropdown-toggle"> <i className="uil uil-angle-right"></i> </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                </ul>
              ))
            }
            <div className="mt-3 text-center"><Pagination currentPage={this.state.pagination.current_page} lastPage={this.state.pagination.last_page} onClick={this.pagination.bind(this)} /></div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default connect(s => s)(PayrollList)
