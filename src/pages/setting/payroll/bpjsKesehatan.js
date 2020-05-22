import React, {Component} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import con from '../../../con/api'
import { Desimal } from '../../../components/form'
import Alert from '../../../components/alert'
import StickyBottom from '../../../components/stickyBottom'
import { ClassicSpinner } from 'react-spinners-kit'

class BPJSKesehatan extends Component {
  _isMounted = false;
  state = {
    alert: false,
    alertMsg: '',
    loading: true,
    bpjs:[]
  }
  componentDidMount(){
    this._isMounted = true;
    this._isMounted && axios.get(con.api+'/payroll/bpjs/kesehatan', {headers:con.headers}).then(res => {
      this.setState({bpjs: res.data, loading: false});
    });
    document.title = 'BPJS Kesehatan';
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  onSubmit(e){
    e.preventDefault();
    const form = e.target, q = {};
    const company = form.querySelector('input[name=company]').value;
    const employee = form.querySelector('input[name=employee]').value;
    const min = form.querySelector('input[name=min]').value;
    const max = form.querySelector('input[name=max]').value;
    if (company) { q['company'] = parseFloat(company.split('.').join('').replace(',', '.')); }
    if (employee) { q['employee'] = parseFloat(employee.split('.').join('').replace(',', '.')); }
    if (min) { q['min'] = parseFloat(min.split('.').join('').replace(',', '.')); }
    if (max) { q['max'] = parseFloat(max.split('.').join('').replace(',', '.')); }
    if (q.min && q.max && (q.company || q.employee)) {
      this.setState({alert: false, loading: true});
      axios.post(con.api+'/payroll/bpjs/kesehatan/update', q, {headers:con.headers}).then(res => {
        this.setState({bpjs: res.data, loading:false});
      }).catch(() => this.setState({alert: true, loading: false, alertMsg: 'Terjadi masalah pada koneksi. Mohon ulangi kembali dalam beberapa saat..'}));
    }else {
      this.setState({alert: true, alertMsg: 'Mohon lengkapi dan isi dengan benar semua field yang tersedia..'});
    }
  }
  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        { this.state.loading && <div className="overlay center"><ClassicSpinner color="#5369f8" loading={true} /></div> }
        <h5 className="py-2 mb-3 mt-0 border-bottom border-2">BPJS Kesehatan</h5>
        {
          this.state.alert &&
          <Alert theme="danger" close onClose={() => setTimeout(() => this.setState({alert: false}), 100)}>
            {this.state.alertMsg}
          </Alert>
        }
        <Alert theme="success" icon="false">
          Roll umum untuk pengaturan BPJS Kesehatan adalah : <br/>
          <ol className="m-0 pl-4">
            <li> Company Rate: <strong>4%</strong>, </li>
            <li> Employee Rate: <strong>1%</strong>, </li>
            <li> Salary Min: <strong>UMR/UMK</strong>, </li>
            <li>Salary Max: <strong>Rp. 12.000.000</strong></li>
          </ol>
        </Alert>
        {/* Submit Button */}
        <StickyBottom>
          <Link to="/payroll/list" className="btn btn-xs width-md radius-5 text-light text-9"><i className="uil uil-times mr-1" />Kembali</Link>
          <button type="submit" className="btn btn-xs width-md radius-5 btn-soft-info"><i className="uil uil-check-circle mr-1" />Simpan Perubahan</button>
        </StickyBottom>
        <div className="row sticky-bottom-container pt-3">
          {/* Line 1 */}
          <div className="col-12">
            <div className="shadow-xl radius-10 p-3 mb-3">
              <div className="row">
                <Desimal sm rowClass="col-md-6 my-2" name="company" value={this.state.bpjs.company} title={`Dibayarkan oleh "Perusahaan"`} placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 my-2" name="employee" value={this.state.bpjs.employee} title={`Dibayarkan oleh "Karyawan"`} placeholder="0" max="100" icon="%" right />
                <Desimal sm rowClass="col-md-6 my-2" name="min" value={this.state.bpjs.min} title={`Minimal Besaran Gaji / bln`} placeholder={`Minimal Besaran Gaji / bln`} max="999999999" icon="Rp. " />
                <Desimal sm rowClass="col-md-6 my-2" name="max" value={this.state.bpjs.max} title={`Maksimal Besaran Gaji / bln`} placeholder={`Maksimal Besaran Gaji / bln`} max="999999999" icon="Rp. " />
              </div>
            </div>
          </div>
          {/* Line 2 */}
          {/* <div className="row">
          </div> */}
        </div>
      </form>
    )
  }
}
export default BPJSKesehatan
