import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import {Input, Textarea, Checkbox} from '../../../components/form'
import axios from 'axios'
import con from '../../../con/api'
import { ClassicSpinner } from "react-spinners-kit"
import Modal from '../../../components/modal'

class EditRole extends Component {
  _isMounted = false;
  state = {
    loading: true,
    role: {},
    access:[]
  }
  componentDidMount(){
    this._isMounted = true;
    document.title = 'Edit Role and Roles';
    this.roleId = this.props.match.params.roleId;
    this._isMounted && axios.get(con.api+'/role/detail/'+this.roleId, {headers:con.headers}).then(res => {
      this.setState({ role:res.data.role, access:res.data.access, loading:false });
    }).then(() => {
      if (this.state.access[0]) {
        for (let r of this.state.access) this.form.querySelector(`input[name=${r}]`).checked = true;
      }
    }).then(() => {
      ['user_scope', 'absen_scope', 'setting_scope'].map(r => {
        if (this.form) {
          const f = this.form.querySelector(`#${r}`).parentElement.nextElementSibling;
          const length = f.querySelectorAll('input[type=checkbox]').length;
          const checked = f.querySelectorAll('input[type=checkbox]:checked').length;
          this.form.querySelector(`#${r}`).checked = checked >= length;
        }
        return true;
      });
    });
  }
  componentWillUnmount(){
    this._isMounted = false;
    this.setState({loading:false});
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {role_id: this.props.match.params.roleId}, roles = {};
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
      axios.post(con.api+'/role/update', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.onSubmit(`Berhasil Mengupdate ${res.data.name}`);
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
  delete(e){
    axios.post(con.api+'/role/delete', {role_id: e}, {headers:con.headers}).then(res => {
      this.props.onSubmit(`Berhasil Menghapus ${res.data.role.name}`);
      this.props.history.push('/role');
    });
  }
  render(){
    const ModalDelete = () => (
      <Fragment>
        <div className="text-center text-dark">
          Apakah anda yakin ingin menghapus <span className="text-danger strong text-capitalize">{`"${(this.state.role.name || '')}"`}</span> ?
        </div>
        <div className="modal-footer pb-0 px-0 mt-3">
          <button type="button" className="btn btn-sm text-muted width-xs" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-sm btn-rounded btn-soft-danger" data-dismiss="modal" onClick={this.delete.bind(this, this.state.role.role_id)}>Save changes</button>
        </div>
      </Fragment>
    )
    return(
      <form onSubmit={this.onSubmit.bind(this)} ref={i => this.form = i}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <Modal id="deleteModal" content={<ModalDelete />} />
        <div className="row">
          <div className="col-12">
            <h5 className="pb-2 mb-3 border-bottom border-2">
              Edit Role <span className="text-muted text-8">({this.state.role.name})</span>
              <button type="submit" className="btn btn-xs radius-20 btn-success float-right"><i className="uil uil-check mr-1" />Simpan Perubahan</button>
              <span className="btn btn-xs radius-20 text-danger mr-2 pointer float-right" data-toggle="modal" data-target="#deleteModal"><i className="uil uil-trash mr-1" />Hapus Role</span>
            </h5>
          </div>
          <Input defaultValue={this.state.role.name} sm rowClass="col-12 mb-2" name="name" title="Nama Role" placeholder="Nama Role" />
          <Textarea defaultValue={this.state.role.desc} sm rowClass="col-12 mb-2" name="desc" title="Deskripsi" placeholder="Deskripsi singkat jabatan..." rows={3} />
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
export default withRouter(EditRole)
