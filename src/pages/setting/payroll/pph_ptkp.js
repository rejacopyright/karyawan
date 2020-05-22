import React, {Component} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import { Desimal } from '../../../components/form'
import Alert from '../../../components/alert'
import StickyBottom from '../../../components/stickyBottom'
import { ClassicSpinner } from 'react-spinners-kit'

class Ptkp extends Component {
  _isMounted = false;
  state = {
    alert: false,
    alertMsg: '',
    loading: true,
    pph:[]
  }
  componentDidMount(){
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/payroll/pph/ptkp', {headers:con.headers}).then(res => {
      this.setState({pph: res.data, loading: false});
    }).catch(() => this.setState({ loading: false, alert: true, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..' }));
    document.title = 'PPH 21';
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {};
    const tk = form.querySelector('input[name=tk]').value;
    const k = form.querySelector('input[name=k]').value;
    const ki = form.querySelector('input[name=ki]').value;
    const tanggungan = form.querySelector('input[name=tanggungan]').value;
    const max = form.querySelector('input[name=max]').value;
    if (tk) { q['tk'] = parseFloat(tk.split('.').join('').replace(',', '.')); }
    if (k) { q['k'] = parseFloat(k.split('.').join('').replace(',', '.')); }
    if (ki) { q['ki'] = parseFloat(ki.split('.').join('').replace(',', '.')); }
    if (tanggungan) { q['tanggungan'] = parseFloat(tanggungan.split('.').join('').replace(',', '.')); }
    if (max) { q['max'] = parseFloat(max.split('.').join('').replace(',', '.')); }
    if (q.tk && q.k && q.ki && q.tanggungan && q.max) {
      this.setState({alert: false, loading: true});
      axios.post(con.api+'/payroll/pph/ptkp/update', q, {headers:con.headers}).then(res => {
        console.log(res.data);
        this.setState({pph: res.data, loading:false});
      }).catch(() => this.setState({alert: true, loading: false, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..'}));
    }else {
      this.setState({alert: true, alertMsg: 'Mohon lengkapi dan isi dengan benar semua field yang tersedia..'});
    }
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <h6 className="py-2 mb-3 mt-0 border-bottom border-1 text-10">Penghasilan Tidak Kena Pajak (PTKP)</h6>
        {
          this.state.alert &&
          <Alert theme="danger" close onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            {this.state.alertMsg}
          </Alert>
        }
        {/* Submit Button */}
        <StickyBottom>
          <div className="row">
            <div className="col text-muted lh-2 text-9 text-left"> Penghasilan Tidak Kena Pajak (PTKP) </div>
            <div className="col-auto px-0"> <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-light text-9"><i className="uil uil-times mr-1" />Kembali</Link> </div>
            <div className="col-auto"> <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-info"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button> </div>
          </div>
        </StickyBottom>
        <div className="row sticky-bottom-container pt-3">
          {/* STATUS */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-4">
              <div className="row">
                <div className="col-12"> <h6 className="mt-0 border-bottom border-2 pb-2">Status</h6> </div>
                <Desimal sm rowClass="col-12 mb-2" name="tk" value={this.state.pph.tk} title="TK (Tidak Kawin)" placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12 mb-2" name="k" value={this.state.pph.k} title="K (Kawin)" placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12 mb-2" name="ki" value={this.state.pph.ki} title="K/I (NPWP Suami & Istri digabung)" placeholder="0" icon="Rp. " />
              </div>
            </div>
          </div>
          {/* TANGGUNGAN */}
          <div className="col-md-6">
            <div className="shadow-xl p-3 radius-10 mb-4">
              <div className="row">
                <div className="col-12"> <h6 className="mt-0 border-bottom border-2 pb-2">Tanggungan</h6> </div>
                <Desimal sm rowClass="col-12 mb-2" name="tanggungan" value={this.state.pph.tanggungan} title="Tanggungan" placeholder="0" icon="Rp. " />
                <Desimal sm rowClass="col-12 mb-2" name="max" value={this.state.pph.max} title="Maksimal Tanggungan" placeholder="0" icon="Orang" right />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
export default Ptkp
