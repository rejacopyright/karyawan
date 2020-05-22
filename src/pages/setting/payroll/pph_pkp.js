import React, {Component, Fragment} from 'react'
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
    this._isMounted && axios.get(con.api+'/payroll/pph/pkp', {headers:con.headers}).then(res => {
      this.setState({pph: res.data.length ? res.data.sort((a,b) => (a.nominal !== b.nominal) ? (a.nominal - b.nominal) : (a.pajak - b.pajak)) : [], loading: false, alert:false});
    }).catch(() => this.setState({ loading: false, alert: true, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..' }));
    document.title = 'PPH 21';
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  plus(e){
    e.preventDefault();
    const target = e.target;
    const data = {};
    const nm = target.querySelector('input[name=nm]').value;
    const pj = target.querySelector('input[name=pj]').value;
    if (nm) { data['nm'] = parseFloat(nm.split('.').join('').replace(',', '.')); }
    if (pj) { data['pj'] = parseFloat(pj.split('.').join('').replace(',', '.')); }
    // Bikin Uniq ID Otomatis
    let id = this.state.pph.map(a => a.id);
    let maxNominal = this.state.pph.map(a => a.nominal);
    if (!id.length) { id = maxNominal = [0]; }
    id = Math.max(...id) + 1;
    // Validasi
    maxNominal = Math.max(...maxNominal);
    const duplicateMax = this.state.pph.filter(a => a.nominal === maxNominal).length;
    const biggerThanDuplicateMax = duplicateMax > 1 && data.nm >= maxNominal;
    if (data.nm && data.pj && (!this.state.pph.map(r => r.nominal).includes(data.nm) || (data.nm === maxNominal && duplicateMax < 2)) && !biggerThanDuplicateMax) {
      const pph = [...this.state.pph, {id:id, nominal:data.nm, pajak:data.pj}];
      this.setState({pph: pph.sort((a,b) => (a.nominal !== b.nominal) ? (a.nominal - b.nominal) : (a.pajak - b.pajak)), alert:false}, () => {
        setTimeout(() => target.querySelector('input[name=nm]').focus(), 100);
      });
    }else if (biggerThanDuplicateMax){
      this.setState({alert: true, alertMsg: 'Anda sudah memiliki nilai terbesar lebih dai satu dan anda memasukan nilai nominal yang sama / lebih besar dari nilai maksimal yang sudah ada. Hapus dahulu salahsatu nilai terbesar untuk menmbahkan ke daftar PKP..'});
    }else if (this.state.pph.map(r => r.nominal).includes(data.nm)) {
      this.setState({alert: true, alertMsg: 'Nilai Pajak yang anda masukan sudah ada, coba nilai lain..'});
    }else {
      this.setState({alert: true, alertMsg: 'Mohon isikan nominal dan persentase pajak..'});
    }
  }
  minus(id){
    const data = this.state.pph.filter(r => r.id !== id);
    this.setState({pph: data});
  }
  onSubmit(e){
    e.preventDefault();
    if (this.state.pph.length) {
      this.setState({alert: false, loading: true});
      axios.post(con.api+'/payroll/pph/pkp/update', {pkp: this.state.pph}, {headers:con.headers}).then(res => {
        this.setState({pph: res.data.sort((a,b) => (a.nominal !== b.nominal) ? (a.nominal - b.nominal) : (a.pajak - b.pajak)), alert: false, loading:false});
      }).catch(err => {
        this.setState({alert: true, loading: false, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..'});
      });
    }else {
      this.setState({alert: true, alertMsg: 'List PKP tidak boleh kosong..'});
    }
  }
  render(){
    return(
      <Fragment>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <h6 className="py-2 mb-3 mt-0 border-bottom border-1 text-10">Penghasilan Kena Pajak (PKP)</h6>
        {
          this.state.alert &&
          <Alert theme="danger" close onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            {this.state.alertMsg}
          </Alert>
        }
        <div className="row">
          <div className="col-12">
            <ul className="message-list mb-1">
              <li className="h-unset lh-unset radius-5">
                <form className="center p-2" onSubmit={this.plus.bind(this)}>
                  <Desimal sm rowClass="col mb-1" name="nm" title="Nominal" placeholder="0" icon="Rp." />
                  <Desimal sm rowClass="col mb-1" name="pj" title="Pajak" placeholder="0" icon="%" max="100" right />
                  <div className="col-auto mb-1 mt-3 border-left">
                    <button type="submit" className="same-30 border-0 radius-10 center bg-soft-primary"><i className="uil uil-plus text-primary" /></button>
                  </div>
                </form>
              </li>
            </ul>
            <hr className="border-1 border-light mb-0"/>
            <form onSubmit={this.onSubmit.bind(this)}>
              {/* Submit Button */}
              <StickyBottom>
                <div className="row">
                  <div className="col text-muted lh-2 text-9 text-left"> </div>
                  <div className="col-auto px-0"> <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-light text-9"><i className="uil uil-times mr-1" />Kembali</Link> </div>
                  <div className="col-auto px-0"> <span className="btn btn-xs width-md radius-5 btn-soft-danger pointer" onClick={this.componentDidMount.bind(this)}><i className="uil uil-check-circle mr-1" />Reset</span> </div>
                  <div className="col-auto"> <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-info"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button> </div>
                </div>
              </StickyBottom>
              <div className="row sticky-bottom-container pt-3">
                <div className="col-12 mb-4">
                  { this.state.pph.length > 0 && <h6 className="my-3">List Penghasilan Kena Pajak (PKP)</h6> }
                  {
                    this.state.pph.map((r, key) => (
                      <div className="center mx-0 p-2 mb-2 shadow radius-5" key={key}>
                        <div className="col-auto pr-0"> <div className="center same-20 radius-20 bg-soft-primary text-primary text-7 f-600 lh-auto"> {++key} </div> </div>
                        <div className="col text-8 text-muted f-600 lh-1">
                          { this.state.pph.length === key ? 'Lebih Besar Dari' : 'Lebih Kecil / Sama Dengan' }
                        </div>
                        <div className="col text-success lh-1">
                          <div className="text-8 text-muted f-600 lh-15">Nominal</div>
                          Rp. {r.nominal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                        </div>
                        <div className="col text-danger lh-1">
                          <div className="text-8 text-muted f-600 lh-15">Pajak</div>
                          {r.pajak.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}%
                        </div>
                        <div className="col-auto"><div className="same-25 border-0 radius-10 center bg-soft-danger pointer" onClick={this.minus.bind(this, r.id)}><i className="uil uil-times text-danger" /></div></div>
                      </div>
                    ))
                  }
                </div>
                {/* {
                  this.state.pph.length > 0 &&
                } */}
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Ptkp
