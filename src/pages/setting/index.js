import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import cookie from 'js-cookie'
import TimePicker from '../../components/timePicker'
import axios from 'axios'
import con from '../../con/api'
import { connect } from 'react-redux'

import {Input, Textarea} from '../../components/form'
import Notif from '../../components/notif'
import { ClassicSpinner } from "react-spinners-kit"
// import moment from 'moment';
// import 'moment/locale/id';

class Setting extends Component {
  _isMounted = false;
  state = {
    user: cookie.getJSON('user') || [],
    setting: {},
    loading: true,
    snackOpen: false,
    snackTheme: 'primary',
    snackMsg: '',
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/setting', {headers:con.headers}).then(res => {
      this.setState({ setting: res.data, loading: false });
    });
    document.title = 'Pengaturan';
  }
  update(req){
    this.setState({ loading:true });
    axios.post(con.api+'/setting/update', req, {headers:con.headers}).then(res => {
      this.setState({ setting:res.data, loading: false, snackOpen: true, snackTheme: 'success', snackMsg: 'Berhasil Menyimpan Perubahan...' });
    }).catch(() => this.setState({ loading: false, snackOpen: true, snackTheme: 'danger', snackMsg: 'Mohon cek kembali data yang telah di input...' }));
  }
  changeTime(e, name){
    this.update({[name]:e.format('YYYY-MM-DD HH:mm:[00]')});
  }
  changeSetting(e){
    e.preventDefault();
    const f = e.target, q = {};
    q['name'] = f.querySelector('input[name=name]').value;
    q['desc'] = f.querySelector('textarea[name=desc]').value;
    this.update(q);
  }
  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-md-3">
                <form action="" onSubmit={this.changeSetting.bind(this)}>
                  <h4 className="border-bottom border-2 pb-1">Profile Instansi</h4>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <Input sm name="name" title="Nama Instansi" placeholder="Nama Instansi" defaultValue={this.state.setting.name} onChange={i => this.props.handleSettingName(i)} />
                    </div>
                    <div className="col-12 mb-2">
                      <Textarea sm name="desc" title="Deskripsi" placeholder="Deskripsi instansi..." defaultValue={this.state.setting.desc} rows={5} />
                    </div>
                    <div className="col-12 text-right">
                      <button type="submit" className="btn btn-xs radius-5 btn-soft-success"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button>
                    </div>
                  </div>
                </form>
                <hr/>
                <h4 className="border-bottom border-2 pb-1">Jam Kerja</h4>
                <div className="row">
                  <div className="col text-center">
                    <small className="d-block border-bottom border-1 mb-2 text-muted pb-2"> Jam Masuk </small>
                    <TimePicker name="in" defaultValue={this.state.setting.in} onChange={this.changeTime.bind(this)} className={`btn-white border-0 shadow-xs btn-sm px-3 text-dark text-10 f-700`} />
                  </div>
                  <div className="col text-center">
                    <small className="d-block border-bottom border-1 mb-2 text-muted pb-2"> Jam Keluar </small>
                    <TimePicker name="out" defaultValue={this.state.setting.out} onChange={this.changeTime.bind(this)} className={`btn-white border-0 shadow-xs btn-sm px-3 text-dark text-10 f-700`} />
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-auto">
                    <h4 className="border-bottom border-2 pb-1">Human Resources</h4>
                    <Link to="/jabatan" className="center-left">
                      <i className="uil uil-angle-right m-0 text-muted mr-2" />
                      <h6 className="m-0 text-10 f-400"> Jabatan </h6>
                    </Link>
                    <Link to="/payroll" className="center-left">
                      <i className="uil uil-angle-right m-0 text-muted mr-2" />
                      <h6 className="m-0 text-10 f-400"> Payroll Master </h6>
                    </Link>
                    <Link to="/payment" className="center-left">
                      <i className="uil uil-angle-right m-0 text-muted mr-2" />
                      <h6 className="m-0 text-10 f-400"> User Payment </h6>
                    </Link>
                  </div>
                  <div className="col-auto">
                    <h4 className="border-bottom border-2 pb-1">Administrator</h4>
                    <Link to="/role" className="center-left">
                      <i className="uil uil-angle-right m-0 text-muted mr-2" />
                      <h6 className="m-0 text-10 f-400"> Admin Roles </h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
            <Notif open={this.state.snackOpen} onClose={() => this.setState({ snackOpen:false })} msg={this.state.snackMsg} theme={this.state.snackTheme} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSettingName: (e) => dispatch({type:'SETTING_NAME', value:e.target.value})
  }
}
export default connect(state => state, mapDispatch)(Setting);
