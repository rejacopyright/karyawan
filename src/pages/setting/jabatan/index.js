import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { ClassicSpinner } from "react-spinners-kit"
import { Switch, Route, Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import AddJabatan from './add'
import EditJabatan from './edit'

import Skeleton from 'react-skeleton-loader'
import Notif from '../../../components/notif'

function DefaultPage(){
  return(
    <div className="row">
      <div className="col-12 text-center mt-4">
        <img src={require('../../../assets/images/not-found.png')} alt="" width="250" style={{ filter: 'opacity(.25)' }} />
        <div className="d-block text-muted"><i className="uil uil-exclamation-circle mr-2" />Silahkan pilih list jabatan yang ingin di update atau tambah jabatan... !</div>
      </div>
    </div>
  )
}
class Jabatan extends Component {
  _isMounted = false;
  state = {
    jabatan:[],
    page:1,
    loading: true,
    loadmore: false,
    empty: false,
    snackOpen: false,
    snackTheme: 'primary',
    snackMsg: '',
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'Jabatan';
    this._isMounted && axios.get(con.api+'/jabatan', {headers:con.headers, params:{page:this.state.page}}).then(res => {
      this.setState({ jabatan:res.data.jabatan, loading:false });
    });
  }
  componentDidUpdate(prev) {
    if (this.props.search !== prev.search && this._isMounted) {
      axios.get(con.api+'/jabatan', {headers:con.headers, params:{page:1, q:this.props.search}}).then(res => {
        this.setState({ jabatan:res.data.jabatan, page: 1, loading:false });
      });
    }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  onDataUpdate(msg){
    this._isMounted && axios.get(con.api+'/jabatan', {headers:con.headers, params:{page: 1, q:this.props.search}}).then(res => {
      this.setState({ jabatan:res.data.jabatan, snackOpen: true, snackTheme: 'success', snackMsg: msg, page: 1 });
    });
  }
  scrollJabatan(e){
    let page = this.state.page;
    if (e.top >= 1) {
      if (!this.state.empty) {
        this.setState({ loadmore: true });
      }
      this.setState({page: ++page}, () => {
        this._isMounted && axios.get(con.api+'/jabatan', {headers:con.headers, params:{page:this.state.page, q:this.props.search}}).then(res => {
          if (res.data.jabatan.length) {
            this.setState({ jabatan:this.state.jabatan.concat(res.data.jabatan) });
          }else {
            this.setState({ page: --page, empty: true });
          }
        }).then(() => this.setState({ loadmore: false }));
      });
    }
  }
  render(){
    return(
      <div className="content-page">
        <div className="content">
          <Notif open={this.state.snackOpen} onClose={() => this.setState({ snackOpen:false })} msg={this.state.snackMsg} theme={this.state.snackTheme} />
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12">
                <Link to="/setting" className="center-left text-muted">
                  <i className="uil uil-arrow-left mr-2" /> Back
                </Link>
                <div className="email-container bg-transparent">
                  <div className="inbox-leftbar px-3 pt-0">
                    <h5 className="border-bottom border-2 pb-2">Jabatan</h5>
                    <Link to="/jabatan/add" className="btn btn-xs btn-white text-dark pointer text-8"><i className="uil uil-plus mr-2" />Tambah Jabatan</Link>
                    <div className="mail-list mt-2">
                      <Scrollbars style={{ height: 200 }} onScrollFrame={this.scrollJabatan.bind(this)}>
                        {
                          this.state.loading ?
                          <Skeleton width="100%" height="10px" count={5} widthRandomness={0} color="#eee" />
                          :
                          this.state.jabatan.map((r, key) => (
                            <Link to={`/jabatan/detail/${r.jabatan_id}`} key={key} className="list-group-item center-left border-0 px-0 py-1 text-9"> <span className="mr-2">{key+1}. </span> {r.name} </Link>
                          ))
                        }
                        { (this.state.loadmore && !this.state.loading) && <div className="center pt-2"><ClassicSpinner size={15} color="#ccc" loading={true} /></div> }
                      </Scrollbars>
                    </div>
                  </div>
                  <div className="inbox-rightbar">
                    <Switch>
                      <Route exact path="/jabatan" component={DefaultPage} />
                      <Route exact path="/jabatan/add" component={() => <AddJabatan onSubmit={this.onDataUpdate.bind(this)} />} />
                      <Route exact path="/jabatan/detail/:jabatanId" component={() => <EditJabatan onSubmit={this.onDataUpdate.bind(this)} />} />
                    </Switch>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(s => s)(Jabatan)
