import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Input, Textarea} from '../../../components/form'
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
    document.title = 'Tambah Jabatan';
  }
  componentWillUnmount(){
    this._isMounted = false;
    this.setState({loading:false});
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {};
    q['name'] = form.querySelector('input[name=name]').value;
    q['desc'] = form.querySelector('textarea[name=desc]').value;

    // Store
    if (q.name && this._isMounted) {
      this.setState({loading:true});
      axios.post(con.api+'/jabatan/store', q, {headers:con.headers}).then(res => {
        this.setState({loading:false}, () => {
          this.props.onSubmit(`Berhasil Menambahkan ${res.data.name} ke dalam Jabatan`);
          this.props.history.push('/jabatan');
        });
      });
    }
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <div className="row">
          <div className="col-12"> <h5 className="pb-2 mb-3 border-bottom border-2">Tambah Jabatan dan Jabatan <button type="submit" className="btn btn-xs radius-20 btn-primary float-right"><i className="uil uil-check mr-1" />Simpan Perubahan</button></h5> </div>
          <Input sm rowClass="col-12 mb-2" name="name" title="Nama Jabatan" placeholder="Nama Jabatan" autoFocus />
          <Textarea sm rowClass="col-12 mb-2" name="desc" title="Deskripsi" placeholder="Deskripsi singkat jabatan..." rows={3} />
        </div>
      </form>
    )
  }
}
export default withRouter(Add)
