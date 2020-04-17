import React from 'react'
import {Link} from 'react-router-dom'
import cookie from 'js-cookie'
import TimePicker from '../../components/timePicker'
import axios from 'axios'
import con from '../../con/api'
import { connect } from 'react-redux'

import {Input, Textarea} from '../../components/form'
import feather from 'feather-icons'
import Notif from '../../components/notif'
import { ClassicSpinner } from "react-spinners-kit"
// import moment from 'moment';
// import 'moment/locale/id';

class Setting extends React.Component {
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
    feather.replace();
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
              <div className="col-md-4">
                <form action="" onSubmit={this.changeSetting.bind(this)}>
                  <div className="card shadow-sm">
                    <div className="btn-soft-primary p-1 text-center border-top border-primary f-600">Profile Instansi</div>
                    <div className="card-body px-2 pb-1">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <Input name="name" title="Nama Instansi" placeholder="Nama Instansi" defaultValue={this.state.setting.name} onChange={i => this.props.handleSettingName(i)} />
                        </div>
                        <div className="col-12 mb-2">
                          <Textarea name="desc" title="Deskripsi" placeholder="Deskripsi instansi..." defaultValue={this.state.setting.desc} rows={5} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right p-2 border-top">
                      <button type="submit" className="btn btn-sm btn-rounded btn-soft-success"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button>
                    </div>
                  </div>
                </form>
                <div className="card shadow-sm">
                  <div className="btn-soft-primary p-1 text-center border-top border-primary f-600">Jam Kerja</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <small className="d-block"> Jam Masuk </small>
                        <TimePicker name="in" defaultValue={this.state.setting.in} onChange={this.changeTime.bind(this)} className={`btn-light btn-sm px-3 text-primary text-10 f-700`} />
                      </div>
                      <div className="col">
                        <small className="d-block"> Jam Keluar </small>
                        <TimePicker name="out" defaultValue={this.state.setting.out} onChange={this.changeTime.bind(this)} className={`btn-light btn-sm px-3 text-danger text-10 f-700`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card shadow-sm border-top border-gray">
                      <Link to="payroll" className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto pr-0">
                            <i className="uil uil-money-bill lh-1 text-16" />
                          </div>
                          <div className="col">
                            <h6 className="m-0"> Payroll </h6>
                          </div>
                        </div>
                      </Link>
                    </div>
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
