import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Input, Textarea, Checkbox} from '../../../components/form'
import axios from 'axios'
import con from '../../../con/api'
import { ClassicSpinner } from "react-spinners-kit"

class Add extends Component {
  _isMounted = false;
  state = {
    loading: true
  }
  // _isLoading = true;
  componentDidMount(){
    this._isMounted = true;
    this.setState({loading:false});
    document.title = 'Add Role';
  }
  componentWillUnmount(){
    this._isMounted = false;
    this.setState({loading:false});
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {}, roles = {};
    q['name'] = form.querySelector('input[name=name]').value;
    q['desc'] = form.querySelector('textarea[name=desc]').value;

    // Roles Group
    roles['user'] = Array.prototype.slice.call(this.user_scope.querySelectorAll('input[type=checkbox]:checked')).map(c => c.name);
    roles['absen'] = Array.prototype.slice.call(this.absen_scope.querySelectorAll('input[type=checkbox]:checked')).map(c => c.name);
    roles['setting'] = Array.prototype.slice.call(this.setting_scope.querySelectorAll('input[type=checkbox]:checked')).map(c => c.name);

    // Collected Roles
    q['role'] = Object.values(roles).reduce((a, b) => a.concat(b));

    // Store
    if (q.name && this._isMounted) {
      this.setState({loading:true});
      axios.post(con.api+'/role/store', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.onSubmit(`Berhasil Menambahkan ${res.data.name} ke dalam Role`);
          this.props.history.push('/role');
        });
      });
    }
  }
  checkAll(e){
    Array.prototype.slice.call(e.target.parentElement.nextElementSibling.querySelectorAll('input[type=checkbox]')).map(c => c.checked = e.target.checked);
  }
  checkSingle(e){
    const parent = e.target.parentElement.parentElement;
    const head = parent.previousElementSibling.querySelector('input[type=checkbox]');
    const length = parent.querySelectorAll('input[type=checkbox]').length;
    const checked = parent.querySelectorAll('input[type=checkbox]:checked').length;
    head.checked = checked >= length;
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <div className="row">
          <div className="col-12"> <h5 className="pb-2 mb-3 border-bottom border-2">Tambah Role <button type="submit" className="btn btn-xs radius-20 btn-primary float-right"><i className="uil uil-check mr-1" />Simpan Perubahan</button></h5> </div>
          <Input sm rowClass="col-12 mb-2" name="name" title="Nama Role" placeholder="Nama Role" autoFocus />
          <Textarea sm rowClass="col-12 mb-2" name="desc" title="Deskripsi" placeholder="Deskripsi singkat role..." rows={3} />
        </div>
        <h5 className="pb-2 mb-3 border-bottom border-2">Roles <span className="text-muted text-8">(Under Development)</span></h5>
        <div className="row">
          {/* User */}
          <div className="col-md-3">
            <Checkbox id="user_scope" label="User" rowClass="mb-2" onChange={this.checkAll.bind(this)} />
            <div className="pl-3" ref={i => this.user_scope = i}>
              <Checkbox small name="user_read" id="user_read" label="View" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="user_create" id="user_create" label="Create" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="user_update" id="user_update" label="Edit" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="user_delete" id="user_delete" label="Remove" onChange={this.checkSingle.bind(this)} />
            </div>
          </div>
          {/* Absensi */}
          <div className="col-md-3">
            <Checkbox id="absen_scope" label="Absensi" rowClass="mb-2" onChange={this.checkAll.bind(this)} />
            <div className="pl-3" ref={i => this.absen_scope = i}>
              <Checkbox small name="absen_read" id="absen_read" label="View" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="absen_create" id="absen_create" label="Create" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="absen_update" id="absen_update" label="Edit" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="absen_delete" id="absen_delete" label="Remove" onChange={this.checkSingle.bind(this)} />
            </div>
          </div>
          {/* Setting */}
          <div className="col-md-3">
            <Checkbox id="setting_scope" label="Setting" rowClass="mb-2" onChange={this.checkAll.bind(this)} />
            <div className="pl-3" ref={i => this.setting_scope = i}>
              <Checkbox small name="setting_master" id="setting_master" label="Settings Master" onChange={this.checkSingle.bind(this)} />
              <Checkbox small name="setting_personal" id="setting_personal" label="Personal Setting" onChange={this.checkSingle.bind(this)} />
            </div>
          </div>
        </div>
      </form>
    )
  }
}
export default withRouter(Add)
