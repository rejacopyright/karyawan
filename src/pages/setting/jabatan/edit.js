import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import {Input, Textarea} from '../../../components/form'
import axios from 'axios'
import con from '../../../con/api'
import { ClassicSpinner } from "react-spinners-kit"
import Modal from '../../../components/modal'

class EditJabatan extends Component {
  _isMounted = false;
  state = {
    loading: true,
    jabatan: {}
  }
  componentDidMount(){
    this._isMounted = true;
    document.title = 'Edit Jabatan';
    this.jabatanId = this.props.match.params.jabatanId;
    this._isMounted && axios.get(con.api+'/jabatan/detail/'+this.jabatanId, {headers:con.headers}).then(res => {
      this.setState({ jabatan:res.data.jabatan, loading:false });
    });
  }
  componentWillUnmount(){
    this._isMounted = false;
    this.setState({loading:false});
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {jabatan_id: this.props.match.params.jabatanId};
    q['name'] = form.querySelector('input[name=name]').value;
    q['desc'] = form.querySelector('textarea[name=desc]').value;

    // Store
    if (q.name && this._isMounted) {
      this.setState({loading:true});
      axios.post(con.api+'/jabatan/update', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.onSubmit(`Berhasil Mengupdate ${res.data.name}`);
        });
      });
    }
  }
  delete(e){
    axios.post(con.api+'/jabatan/delete', {jabatan_id: e}, {headers:con.headers}).then(res => {
      this.props.onSubmit(`Berhasil Menghapus ${res.data.jabatan.name}`);
      this.props.history.push('/jabatan');
    });
  }
  render(){
    const ModalDelete = () => (
      <Fragment>
        <div className="text-center text-dark">
          Apakah anda yakin ingin menghapus <span className="text-danger strong text-capitalize">{`"${(this.state.jabatan.name || '')}"`}</span> ?
        </div>
        <div className="modal-footer pb-0 px-0 mt-3">
          <button type="button" className="btn btn-sm text-muted width-xs" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-sm btn-rounded btn-soft-danger" data-dismiss="modal" onClick={this.delete.bind(this, this.state.jabatan.jabatan_id)}>Save changes</button>
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
              Edit Jabatan <span className="text-muted text-8">({this.state.jabatan.name})</span>
              <button type="submit" className="btn btn-xs radius-20 btn-success float-right"><i className="uil uil-check mr-1" />Simpan Perubahan</button>
              <span className="btn btn-xs radius-20 text-danger mr-2 pointer float-right" data-toggle="modal" data-target="#deleteModal"><i className="uil uil-trash mr-1" />Hapus Jabatan</span>
            </h5>
          </div>
          <Input defaultValue={this.state.jabatan.name} sm rowClass="col-12 mb-2" name="name" title="Nama Jabatan" placeholder="Nama Jabatan" />
          <Textarea defaultValue={this.state.jabatan.desc} sm rowClass="col-12 mb-2" name="desc" title="Deskripsi" placeholder="Deskripsi singkat jabatan..." rows={3} />
        </div>
      </form>
    )
  }
}
export default withRouter(EditJabatan)
